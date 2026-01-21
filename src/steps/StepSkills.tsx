import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { useFormContext, useWatch } from "react-hook-form"
import { useState } from "react"

const POPULAR_SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
]

const ALL_SKILLS = [
  ...POPULAR_SKILLS,
  "Next.js",
  "Vue.js",
  "Angular",
  "Redux",
  "Zustand",
  "Express.js",
  "NestJS",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Git",
  "GitHub",
  "Playwright",
  "Jest",
  "Cypress",
  "Vite",
]

export default function StepSkills() {
  const { control, setValue } = useFormContext()
  const selected: string[] = useWatch({
    control,
    name: "skills",
    defaultValue: [],
  })

  const [search, setSearch] = useState("")

  const isSearching = search.trim().length > 0

  const visibleSkills = isSearching
    ? ALL_SKILLS.filter((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
    : POPULAR_SKILLS

  const onChange = (values: string[]) => {
    setValue("skills", values, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    setSearch("")
  }

  return (
    <div className="space-y-5">
     
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      
      {!isSearching && selected.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Selected skills</p>
          <ToggleGroup.Root
            type="multiple"
            value={selected}
            onValueChange={onChange}
            className="flex flex-wrap gap-2"
          >
            {selected.map((skill) => (
              <SkillItem key={skill} value={skill} />
            ))}
          </ToggleGroup.Root>
        </div>
      )}

      
      <div>
        {!isSearching && (
          <p className="text-sm text-gray-600 mb-2">Popular skills</p>
        )}

        <ToggleGroup.Root
          type="multiple"
          value={selected}
          onValueChange={onChange}
          className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${
            !isSearching ? "max-h-[96px] overflow-hidden" : ""
          }`}
        >
          {visibleSkills.map((skill) => (
            <SkillItem key={skill} value={skill} />
          ))}
        </ToggleGroup.Root>

        {!isSearching && (
          <p className="text-xs text-gray-500 mt-1">
            Use search to find more skills
          </p>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Selected: <strong>{selected.length}</strong>
      </p>
    </div>
  )
}


function SkillItem({ value }: { value: string }) {
  return (
    <ToggleGroup.Item
      value={value}
      className="rounded-lg border px-3 py-2 text-sm font-medium transition
        data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-600
        data-[state=off]:bg-gray-100 data-[state=off]:border-gray-300
        hover:bg-gray-200"
    >
      {value}
    </ToggleGroup.Item>
  )
}
