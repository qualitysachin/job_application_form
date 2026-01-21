import { useFieldArray, useFormContext } from "react-hook-form"

export default function StepExperience() {
  const { control, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  })

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded">
          <input
            {...register(`experiences.${index}.company`)}
            placeholder="Company"
            className="input mb-2"
          />
          <input
            {...register(`experiences.${index}.role`)}
            placeholder="Role"
            className="input mb-2"
          />
          <input
            type="number"
            {...register(`experiences.${index}.years`, {
              valueAsNumber: true,
            })}
            placeholder="Years"
            className="input"
          />
          <button type="button" onClick={() => remove(index)} className="text-red-500 mt-2">
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ company: "", role: "", years: 0 })}
        className="btn"
        >   

        Add Experience
      </button>
    </div>
  )
}