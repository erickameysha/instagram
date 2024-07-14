import React from 'react'
import { Controller } from 'react-hook-form'

import { authActions } from '@/app/authSlice'
import { useAppDispatch } from '@/app/store'
import { SignInFormType, useSignInForm } from '@/features/sign-in/useSignInForm'
import { useSignInMutation } from '@/services/auth/signInApi'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { GithubAuth } from '@/shared/ui/githubAuth'
import { GoogleButton } from '@/shared/ui/googleAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../hooks/useTranslation'

export const SignInForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { control, errors, handleSubmit } = useSignInForm()
  const [signIn, { isSuccess }] = useSignInMutation()

  const onSubmit = (data: SignInFormType) => {
    signIn(data)
  }

  if (isSuccess) {
    router.push('/')
    dispatch(authActions.setIsAuth(true))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col max-w-[360px] sl:max-w-[378px] p-6 m-auto items-center">
        <div>
          <span className="text-h1">{t.auth.signIn}</span>
        </div>
        <div className="flex items-center gap-[60px] pt-2">
          <GoogleButton />
          <GithubAuth />
        </div>
        <div className="flex flex-col gap-[24px] pt-[24px]">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input {...field} error={errors.email?.message} label={t.auth.email} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.password?.message}
                label={t.auth.password}
                type="password"
              />
            )}
          />
        </div>
        <Link className="text-regular-14 text-light-900 ml-auto pt-[36px]" href="/forgot-password">
          {t.auth.forgotPassword}
        </Link>
        <div className="w-full flex flex-col items-center pt-[24px]">
          <Button className="text-h3" fullWidth>
            {t.auth.signIn}
          </Button>
          <span className="text-regular-16 pt-[18px] pb-[6px]">{t.auth.dontHaveAnAccount}</span>
          <Button className="text-h3" variant="text">
            {t.auth.signUp}
          </Button>
        </div>
      </Card>
    </form>
  )
}
