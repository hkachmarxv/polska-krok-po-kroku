import { Lesson } from './courseTypes';
import lesson1 from './lessons/lesson1';
import lesson2 from './lessons/lesson2';
import lesson3 from './lessons/lesson3';
import lesson4 from './lessons/lesson4';
import lesson5 from './lessons/lesson5';
import lesson6 from './lessons/lesson6';
import lesson7 from './lessons/lesson7';
import lesson8 from './lessons/lesson8';
import lesson9 from './lessons/lesson9';
import lesson10 from './lessons/lesson10';
import lesson11 from './lessons/lesson11';
import lesson12 from './lessons/lesson12';
import lesson13 from './lessons/lesson13';
import lesson14 from './lessons/lesson14';
import lesson15 from './lessons/lesson15';
import lesson16 from './lessons/lesson16';
import lesson17 from './lessons/lesson17';
import lesson18 from './lessons/lesson18';
import lesson19 from './lessons/lesson19';
import lesson20 from './lessons/lesson20';

export const lessons: Lesson[] = [
  lesson1, lesson2, lesson3, lesson4, lesson5,
  lesson6, lesson7, lesson8, lesson9, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
];

export const getLessonById = (id: number): Lesson | undefined =>
  lessons.find(l => l.id === id);

export const getLessonVocabulary = (lessonId: number) => {
  const lesson = getLessonById(lessonId);
  return lesson?.vocabulary || [];
};

export const getAllCourseWords = () =>
  lessons.flatMap(l => l.vocabulary);

export { type Lesson, type CourseWord, type Dialogue } from './courseTypes';
