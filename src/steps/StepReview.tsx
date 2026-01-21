import { useFormContext } from "react-hook-form"
import { useState } from "react"
import type { ApplicationForm } from "../schema/applicationSchema"


export default function StepReview() {
  const { getValues } = useFormContext()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const values = getValues() as ApplicationForm


  const submit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
    localStorage.removeItem("job-application")
  }

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          Application Submitted 🎉
        </h2>
        <p className="text-gray-600">
          Thank you for applying. We’ll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      <Section title="Personal Information">
        <Row label="Name" value={values.personal.name} />
        <Row label="Email" value={values.personal.email} />
        <Row label="Phone" value={values.personal.phone} />
        {values.personal.profile && (
          <Row
            label="Profile"
            value={
              <a
                href={values.personal.profile}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            }
          />
        )}
      </Section>

      
      <Section title="Work Experience">
        {values.experiences.map((exp, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-2 bg-gray-50"
          >
            <p className="font-medium">
              {exp.role} @ {exp.company}
            </p>
            <p className="text-sm text-gray-600">
              {exp.years} year{exp.years > 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </Section>

      
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {values.skills.map((skill: string) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      
      <button
        type="button"
        onClick={submit}
        className="btn-primary w-full mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  )
}



function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
