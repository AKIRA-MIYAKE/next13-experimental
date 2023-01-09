import type { FC, ChangeEventHandler, FormEventHandler } from "react";
import { useState, useCallback } from "react";

export interface SignInFormProps {
  onSubmit: (values: { email: string, password: string }) => void
}

export const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const onEmailInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setInputEmail(event.target.value)
  }, [])

  const onPasswordInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setInputPassword(event.target.value)
  }, [])

  const onFormSubmit = useCallback<FormEventHandler>((event) => {
    event.preventDefault()

    if (!inputEmail || !inputPassword) return

    onSubmit({ email: inputEmail, password: inputPassword })
  }, [onSubmit, inputEmail, inputPassword])

  return (
    <form onSubmit={onFormSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="form-control">
            <label className="label pt-0 pb-0.5">Email</label>
            <input
              type="text"
              className="input input-bordered"
              value={inputEmail}
              onChange={onEmailInputChange}
            />
          </div>

          <div className="form-control">
            <label className="label pt-0 pb-0.5">Password</label>
            <input
              type="password"
              className="input input-bordered"
              value={inputPassword}
              onChange={onPasswordInputChange}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Sing in
          </button>
        </div>
      </div>
    </form>
  )
}
