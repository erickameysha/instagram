import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller } from 'react-hook-form'

import {
  ForgotPasswordFormType,
  useForgotPasswordForm,
} from '@/features/password-recovery-form/useForgotPasswordForm'
import { useForgotPasswordMutation } from '@/services/auth/forgotPasswordApi'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useRouter } from 'next/router'

import config from '../../../config'
import { useTranslation } from '../../../hooks/useTranslation'

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isSuccess }] = useForgotPasswordMutation()
  const [modal, setModal] = useState(true)
  const { control, errors, getValues, handleSubmit, isDirty, isValid } = useForgotPasswordForm()

  const onSubmit = (data: ForgotPasswordFormType) => {
    forgotPassword(data)
  }
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-dark-700 p-[15px] sm:bg-dark-500 sm:p-[24px] sm:max-w-[378px] sm:m-auto flex flex-col items-center gap-2">
        <span className="pb-[20px] text-h1">{t.auth.forgotPassword}</span>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              error={errors.email?.message || error ? "User with this email doesn't exist" : ''}
              fullWidth
              label={t.auth.email}
              placeholder="Example@example.com"
            />
          )}
        />
        <span className="text-regular-14 text-light-900 pb-[10px] w-full">
          {t.auth.passwordRecovery}
        </span>
        <Button disabled={!isValid || !isDirty} fullWidth>
          {t.auth.sendLink}
        </Button>
        <Button as="a" fullWidth href="/login" type="button" variant="text">
          {t.auth.backToSignIn}
        </Button>
        <Controller
          control={control}
          name="recaptcha"
          render={({ field }) => (
            <ReCAPTCHA
              {...field}
              hl={router.locale === 'english' ? 'en' : 'ru'}
              sitekey={config.captchaKey!}
              theme="dark"
            />
          )}
        />
      </Card>
      {isSuccess && modal && (
        <Modal className="w-[378px] m-auto" onClose={() => setModal(false)} title="Email sent">
          <span>We have sent a link to confirm your email to {getValues().email}</span>
          <Button onClick={() => setModal(false)} type="button">
            OK
          </Button>
        </Modal>
      )}
    </form>
  )
}
