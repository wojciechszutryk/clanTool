import { FormGroup, FormLabel, styled } from '@mui/material'

export const StyledCheckboxesWrapper = styled(FormGroup)({
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
})

export const StyledLabel = styled(FormLabel)({
    width: '100%',
    textAlign: 'center',
})
