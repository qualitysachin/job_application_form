import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import type { ApplicationForm } from "./schema/applicationSchema"
import { applicationSchema } from "./schema/applicationSchema"

import StepPersonal from "./steps/StepPersonal"
import StepExperience from "./steps/StepExperience"
import StepSkills from "./steps/StepSkills"
import StepReview from "./steps/StepReview"



const personalSchema = applicationSchema.pick({
  personal: true,
})

const experienceSchema = applicationSchema.pick({
  experiences: true,
})

const skillsSchema = applicationSchema.pick({
  skills: true,
})



const steps = ["Personal", "Experience", "Skills", "Review"]

export default function App() {
  const [step, setStep] = useState(0)

  const form = useForm<ApplicationForm>({
    mode: "onChange",
    defaultValues: {
      personal: {
        name: "",
        email: "",
        phone: "",
        profile: "",
      },
      experiences: [],
      skills: [],
    },
  })

  const next = async () => {
    const values = form.getValues()

    try {
      if (step === 0) {
        personalSchema.parse(values)
      }

      if (step === 1) {
        experienceSchema.parse(values)
      }

      if (step === 2) {
        skillsSchema.parse(values)
      }

      setStep((s) => s + 1)
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => {
        form.setError(issue.path.join(".") as any, {
        type: "manual",
        message: issue.message,
          })
        })
    }
    }
  }

  const back = () => setStep((s) => s - 1)

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  i <= step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step === 0 && <StepPersonal />}
          {step === 1 && <StepExperience />}
          {step === 2 && <StepSkills />}
          {step === 3 && <StepReview />}

          <div className="flex justify-between mt-6">
            {step > 0 ? (
              <button type="button" onClick={back} className="btn">
                Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 && (
              <button type="button" onClick={next} className="btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
