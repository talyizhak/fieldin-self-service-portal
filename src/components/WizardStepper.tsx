import { WIZARD_STEPS } from '@/data/constants';

interface Props {
  activeStep: number;
  onStepClick: (step: number) => void;
}

export function WizardStepper({ activeStep, onStepClick }: Props) {
  return (
    <div className="wizard">
      <div className="wizard-steps">
        {WIZARD_STEPS.map((step, i) => {
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          const isClickable = isDone;

          let cls = 'wizard-step';
          if (isDone) cls += ' done';
          if (isActive) cls += ' active';
          if (isClickable) cls += ' clickable';

          return (
            <div
              key={i}
              className={cls}
              onClick={isClickable ? () => onStepClick(i) : undefined}
            >
              <div className="line" />
              <div className="circle">
                {isDone ? '✓' : i + 1}
              </div>
              <div className="label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
