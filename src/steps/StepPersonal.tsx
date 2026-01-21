import { useFormContext } from "react-hook-form"

export default function StepPersonal() {
  const { register, formState } = useFormContext()

  return (
    <div className="space-y-4">
      <Input label="Name" {...register("personal.name")} />
      <Input label="Email" {...register("personal.email")} />
      <Input label="Phone" {...register("personal.phone")} />
      <Input label="LinkedIn / GitHub" {...register("personal.profile")} />
      {formState.errors.personal && (
        <p className="text-red-500 text-sm">Please fix errors</p>
      )}
    </div>
  )
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input {...props} className="input" />
    </div>
  )
}
