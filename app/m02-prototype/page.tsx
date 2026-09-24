import type { Metadata } from 'next';

import { M02LearningExperiencePrototype } from '@/components/prototypes/m02-learning-experience-prototype';

export const metadata: Metadata = {
  title: 'M02 limited visual prototype',
  robots: { index: false, follow: false },
};

export default function M02PrototypePage() {
  return <M02LearningExperiencePrototype />;
}
