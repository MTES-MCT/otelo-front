'use client'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { tss } from 'tss-react'
import { TContactForm, ZContactForm } from '~/schemas/contact-form'

export const ContactForm: FC = () => {
  const { classes } = useStyles()
  // todo - handling form submission
  const {
    formState: { errors },
    register,
  } = useForm<TContactForm>({
    resolver: zodResolver(ZContactForm),
    values: {
      consent: false,
      email: '',
      firstname: '',
      lastname: '',
      message: '',
      subject: '',
    },
  })
  console.log(errors)
  // todo - manage states for each inputs and errors

  return (
    <form>
      <Input
        label="Prénom :"
        nativeInputProps={{
          autoComplete: 'given-name',
          name: 'firstname',
          placeholder: 'Votre prénom',
        }}
        {...register('firstname')}
      />
      <Input
        label="Nom de famille :"
        nativeInputProps={{
          autoComplete: 'family-name',
          name: 'lastname',
          placeholder: 'Votre nom de famille',
        }}
        {...register('lastname')}
      />

      <Input
        label={
          <span>
            Adresse e-mail <span style={{ color: 'red' }}>*</span> :
          </span>
        }
        nativeInputProps={{
          autoComplete: 'email',
          name: 'email',
          placeholder: 'Votre adresse e-mail',
        }}
        hintText="Format attendu : nom@domaine.fr"
        {...register('email')}
      />

      <Input
        label={
          <span>
            Objet de la demande <span style={{ color: 'red' }}>*</span> :
          </span>
        }
        nativeInputProps={{
          name: 'subject',
          placeholder: 'Sujet de votre demande',
        }}
        {...register('subject')}
      />
      <Input
        className={classes.textareaWrapper}
        textArea
        label={
          <span>
            Message <span style={{ color: 'red' }}>*</span> :
          </span>
        }
        nativeTextAreaProps={{
          name: 'message',
          placeholder: 'Votre message',
        }}
        {...register('message')}
      />
      <Checkbox
        options={[
          {
            label: (
              <span>
                En cochant cette case, vous comprenez que les données personnelles entrées, adresse IP comprise, pourront être utilisées
                afin de vous contacter dans le cadre de votre intérêt légitime. <span style={{ color: 'red' }}>*</span>
              </span>
            ),
            nativeInputProps: {
              name: 'consent',
            },
          },
        ]}
      />
      <div className="fr-grid-row fr-grid-row--right">
        <Button
          className="fr-col-md-4 fr-col-12 fr-grid-row--center fr-mt-2w fr-mt-md-0"
          priority="primary"
          type="submit"
          iconPosition="right"
          iconId="fr-icon-send-plane-line"
        >
          Envoyer ma demande
        </Button>
      </div>
    </form>
  )
}

const useStyles = tss.create({
  textareaWrapper: {
    textarea: {
      height: '130px',
    },
  },
})
