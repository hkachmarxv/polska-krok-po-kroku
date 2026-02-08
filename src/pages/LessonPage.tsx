import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import { getLessonById, lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LessonLearnTab } from '@/components/course/LessonLearnTab';
import { LessonFlashcards } from '@/components/course/LessonFlashcards';
import { LessonQuiz } from '@/components/course/LessonQuiz';
import { LessonGrammarDrill } from '@/components/course/LessonGrammarDrill';
import { LessonSentenceBuilder } from '@/components/course/LessonSentenceBuilder';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const id = parseInt(lessonId || '1', 10);
  const lesson = getLessonById(id);

  const completedLessons = progress.lessonsCompleted || [];
  const isUnlocked = id === 1 || completedLessons.includes(id - 1);
  const isCompleted = completedLessons.includes(id);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <Lock className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center">Complete Lesson {id - 1} first to unlock this lesson.</p>
        <button
          onClick={() => navigate('/course')}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium"
        >
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-4">
      {isCompleted && (
        <div className="bg-success/10 border-b border-success/20 px-4 py-2 text-center">
          <p className="text-xs font-medium text-success">✅ Lesson completed</p>
        </div>
      )}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/course')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-sm font-bold truncate">
              {lesson.emoji} Lesson {lesson.id}: {lesson.title}
            </h1>
            <p className="text-xs text-muted-foreground">{lesson.titleEnglish}</p>
          </div>
          {id < lessons.length && isCompleted && (
            <button
              onClick={() => navigate(`/lesson/${id + 1}`)}
              className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-4">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="learn" className="text-xs">📖 Learn</TabsTrigger>
            <TabsTrigger value="flashcards" className="text-xs">🃏 Cards</TabsTrigger>
            <TabsTrigger value="build" className="text-xs">🔨 Build</TabsTrigger>
            <TabsTrigger value="drill" className="text-xs">📐 Drill</TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs">📝 Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <LessonLearnTab lesson={lesson} />
          </TabsContent>

          <TabsContent value="flashcards">
            <LessonFlashcards lesson={lesson} />
          </TabsContent>

          <TabsContent value="build">
            <LessonSentenceBuilder lesson={lesson} />
          </TabsContent>

          <TabsContent value="drill">
            <LessonGrammarDrill lesson={lesson} />
          </TabsContent>

          <TabsContent value="quiz">
            <LessonQuiz lesson={lesson} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LessonPage;
