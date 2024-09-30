'use client'

import React, { FC } from 'react'
import dayjs from 'dayjs'
import { fr } from '@codegouvfr/react-dsfr'
import { tss } from 'tss-react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import { useUsers } from '~/hooks/use-users'
import { useSearchUsers } from '~/hooks/use-search-users'
import { useQueryState } from 'nuqs'

export const UsersTable: FC = () => {
  const { classes, cx } = useStyles()
  const { data: usersResponse } = useUsers()
  const { data: usersSearchResponse } = useSearchUsers()
  const [searchQuery] = useQueryState('q')

  const headers = ['Nom et Prénom', 'Email', 'Role', 'Date de création', 'Date de dernière connexion', 'Supprimer']
  const data = searchQuery ? usersSearchResponse?.users : usersResponse?.users

  const userModals = (data || []).map((user) => {
    const modalActions = createModal({
      id: `delete-user-modal-${user.id}`,
      isOpenedByDefault: false,
    })

    return {
      handleDeleteUser: () => {
        console.log('delete user', user.id)
        modalActions.close()
      },
      modalActions,
      user,
    }
  })

  return (
    <>
      <div className={fr.cx('fr-table')}>
        <table style={{ display: 'table' }}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userModals.map(({ modalActions, user }) => (
              <tr key={user.id}>
                <td>{`${user.firstname} ${user.lastname}`}</td>
                <td>{user.email}</td>
                <td>
                  <div className={cx(fr.cx('fr-badge'), user.role === 'ADMIN' ? classes.adminBadge : classes.userBadge)}>{user.role}</div>
                </td>
                <td>{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>
                <td>{dayjs(user.lastLoginAt).format('DD/MM/YYYY - HH:mm')}</td>
                <td>
                  <div className={classes.actions}>
                    <i style={{ cursor: 'pointer' }} onClick={modalActions.open} className="ri-delete-bin-5-fill" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userModals.map(({ handleDeleteUser, modalActions, user }) => (
        <modalActions.Component key={user.id} title="Êtes vous sûr de vouloir supprimer cet utilisateur ?">
          <p>Cette action est irréversible. L&apos;utilisateur perd ses droits et ses accès à Otelo.</p>
          <div className={classes.actionsModalCtasContainer}>
            <Button priority="secondary" onClick={modalActions.close}>
              Annuler
            </Button>
            <Button className={classes.deleteCta} iconId="ri-delete-bin-5-fill" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </div>
        </modalActions.Component>
      ))}
    </>
  )
}

const useStyles = tss.create({
  actions: {
    color: fr.colors.decisions.text.actionHigh.blueFrance.default,
    display: 'flex',
    gap: '0.5rem',
  },
  actionsModalCtasContainer: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },
  adminBadge: {
    backgroundColor: fr.colors.decisions.background.actionLow.purpleGlycine.default,
    color: fr.colors.decisions.text.actionHigh.purpleGlycine.default,
  },
  deleteCta: {
    '&:hover': {
      backgroundColor: `${fr.colors.decisions.background.actionHigh.redMarianne.default} !important`,
    },
    backgroundColor: fr.colors.decisions.background.actionLow.redMarianne.default,
    color: fr.colors.decisions.background.default.grey.default,
  },
  userBadge: {
    backgroundColor: fr.colors.decisions.background.actionLow.blueCumulus.default,
    color: fr.colors.decisions.text.actionHigh.blueCumulus.default,
  },
})
