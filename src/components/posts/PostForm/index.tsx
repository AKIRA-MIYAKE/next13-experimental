import type { FC, ChangeEventHandler, FormEventHandler } from 'react'
import { useState, useCallback } from 'react'

import type { Post } from '../../../interfaces'

export interface PostFormProps {
  defaultValue?: Post
  onSubmit: (values: { title: string; body: string }) => void
  onRequireDeleting?: () => void
}

export const PostForm: FC<PostFormProps> = ({
  defaultValue,
  onSubmit,
  onRequireDeleting,
}) => {
  const [inputTitle, setInputTitle] = useState(
    defaultValue ? defaultValue.title : ''
  )
  const [inputBody, setInputBody] = useState(
    defaultValue ? defaultValue.body : ''
  )

  const onTitleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setInputTitle(event.target.value)
    },
    []
  )

  const onBodyTextareaChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement>
  >((event) => {
    setInputBody(event.target.value)
  }, [])

  const onPostFormSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault()

      if (!inputTitle || !inputBody) return

      onSubmit({ title: inputTitle, body: inputBody })
    },
    [onSubmit, inputTitle, inputBody]
  )

  const onDeleteButtonClick = useCallback(() => {
    if (!onRequireDeleting) return

    onRequireDeleting()
  }, [onRequireDeleting])

  return (
    <form onSubmit={onPostFormSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="form-control">
            <label className="label pt-0 pb-0.5">Title</label>
            <input
              type="text"
              className="input input-bordered"
              value={inputTitle}
              onChange={onTitleInputChange}
            />
          </div>

          <div className="form-control">
            <label className="label pt-0 pb-0.5">Body</label>
            <textarea
              className="textarea textarea-bordered"
              value={inputBody}
              onChange={onBodyTextareaChange}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
          {defaultValue && (
            <div>
              <button
                type="button"
                className="btn btn-warning"
                onClick={onDeleteButtonClick}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
