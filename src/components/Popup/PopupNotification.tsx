import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { stateType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui-slice'

const PopupNotification = () => {

  const dispatch = useDispatch()
  const { title, text, onSubmit, isVisible = false } = useSelector((state: stateType) => state.ui.popupNotification)

  const onExitHandler = () => {
    dispatch(uiActions.togglePopupNotification(false))
  }

  const onSubmitHandller = () => {
    dispatch(uiActions.togglePopupNotification(false))
    dispatch(onSubmit)
  }

  return (
    <Dialog
      fullScreen={false}
      open={isVisible}
      onClose={onExitHandler}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {text}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onExitHandler}>
          Відмінити
        </Button>
        <Button autoFocus onClick={onSubmitHandller}>
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopupNotification