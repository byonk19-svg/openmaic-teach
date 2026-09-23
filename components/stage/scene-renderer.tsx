'use client';

import { useMemo } from 'react';
import type { Scene, StageMode } from '@/lib/types/stage';
import { SlideEditor as SlideRenderer } from '../slide-renderer/Editor';
import { QuizView } from '../scene-renderers/quiz-view';
import { InteractiveRenderer } from '../scene-renderers/interactive-renderer';
import { PBLRenderer } from '../scene-renderers/pbl-renderer';
import { M02LearningSlide } from '../scene-renderers/m02-learning-slide';

interface SceneRendererProps {
  readonly scene: Scene;
  readonly mode: StageMode;
}

/**
 * Playback scene dispatcher. In Pro (edit) mode, Stage renders EditShell
 * directly as a top-level takeover — SceneRenderer is only on the playback
 * path, so it does not branch on `mode === 'edit'`.
 */
export function SceneRenderer({ scene, mode }: SceneRendererProps) {
  const renderer = useMemo(() => {
    switch (scene.type) {
      case 'slide':
        if (scene.content.type !== 'slide') return <div>Invalid slide content</div>;
        if (
          [
            'm02-orient',
            'm02-pathways',
            'm02-paired-breaths',
            'm02-output-burden',
            'm02-synthesis',
          ].includes(scene.id)
        )
          return <M02LearningSlide sceneId={scene.id} />;
        if (scene.id.startsWith('m02-'))
          return <div role="alert">Unsupported M02 slide scene: {scene.id}</div>;
        if (scene.id === 'm01-model') {
          return (
            <>
              <div aria-hidden="true" className="h-full">
                <SlideRenderer mode={mode} />
              </div>
              <section className="sr-only" aria-labelledby="m01-model-heading">
                <h2 id="m01-model-heading">Three related questions, different evidence</h2>
                <section>
                  <h3>Gas moved per minute</h3>
                  <p>
                    Calculated exhaled minute volume, called gas moved per minute in this lesson,
                    uses rate and volume over a valid window.
                  </p>
                </section>
                <section>
                  <h3>CO2 clearance</h3>
                  <p>Use relevant gas data with time and support context.</p>
                </section>
                <section>
                  <h3>Breathing effort and experience</h3>
                  <p>Use bedside observation and patient report.</p>
                </section>
                <p>Evidence answering one question does not automatically answer the others.</p>
              </section>
            </>
          );
        }
        return <SlideRenderer mode={mode} />;
      case 'quiz':
        if (scene.content.type !== 'quiz') return <div>Invalid quiz content</div>;
        return (
          <QuizView
            key={scene.id}
            questions={scene.content.questions}
            sceneId={scene.id}
            stageId={scene.stageId}
          />
        );
      case 'interactive':
        if (scene.content.type !== 'interactive') return <div>Invalid interactive content</div>;
        return <InteractiveRenderer content={scene.content} sceneId={scene.id} />;
      case 'pbl':
        if (scene.content.type !== 'pbl') return <div>Invalid PBL content</div>;
        return <PBLRenderer content={scene.content} mode={mode} sceneId={scene.id} />;
      default:
        return <div>Unknown scene type</div>;
    }
  }, [scene, mode]);

  return (
    <div data-testid="active-scene-content" data-scene-id={scene.id} className="w-full h-full">
      {renderer}
    </div>
  );
}
