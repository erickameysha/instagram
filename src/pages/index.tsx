import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import Select from '@/shared/ui/Select/Select'
import { useRouter } from 'next/router'

import { english } from '../../locales/english'
import { russian } from '../../locales/russian'

export default function Home() {
  const router = useRouter()

  const t = router.locale === 'english' ? english : russian

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  return (
    <div className="flex py-[100px] px-[100px] gap-[50px]">
      <div className="text-regular-link">home</div>
      <Select onChange={() => {}} options={options} />
      <Checkbox checked className="pl-[200px]" label="checkbox" />
      <Button onClick={() => {}} variant="primary">
        Button
      </Button>
      <h1>{t.test}</h1>
    </div>
  )
}

Home.getLayout = getLayout
