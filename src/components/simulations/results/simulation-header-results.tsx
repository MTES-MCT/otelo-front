'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { tss } from 'tss-react'

export const SimulationHeaderResults = () => {
  // const [view, setView] = useQueryState('vue', { defaultValue: 'projection' })
  const { classes } = useStyles()
  // const switchLabel = view === 'annual' ? 'Vue annuelle' : 'Vue projection'

  return (
    <div className={classes.container}>
      {/* <div className={classes.switchContainer}>
        <ToggleSwitch
          helperText={switchLabel}
          showCheckedHint={false}
          label=""
          inputTitle=""
          checked={view === 'annual'}
          onChange={(checked) => setView(checked ? 'annual' : 'projection')}
          classes={{ hint: classes.switchHelperText, root: classes.switch }}
        />
      </div> */}
      <Button disabled size="small" iconPosition="right" iconId="fr-icon-download-line">
        Export PDF
      </Button>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
  switch: {
    marginLeft: 'auto',
  },
  switchContainer: {
    width: '100px',
  },
  switchHelperText: {
    fontSize: '0.75rem',
    marginTop: '0 !important',
  },
})
