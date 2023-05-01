import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import { detailsActions } from '../../store/details-slice'
import { stateType, detailType } from '../../types'
import SidePanelListItem from './SidePanelListItem'

const SidePanelList = () => {

  const dispatch = useDispatch()
  const assembleItems = useSelector((state: stateType) => state.details.assembleItems)

  const togglePopupHandler = () => {
    dispatch(uiActions.togglePopup(true))
    dispatch(detailsActions.setActiveAssembleItem(-1))
    dispatch(detailsActions.setSelectedAssembleItem(-1))
  }

  const onSelectDetail = (index: number) => {
    dispatch(detailsActions.setActiveAssembleItem(index))
  }

  return (
    <Box
      sx={{ width: { sm: 240 } }}
      component="nav"
    >
      <List>
        {['Додати вироби'].map((text) => (
          <ListItem key={text} disablePadding onClick={togglePopupHandler}>
            <ListItemButton>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {assembleItems.length !== 0 && assembleItems.map((details: detailType[], index) =>
          <Fragment key={index}>
            <Divider />
            <SidePanelListItem
              key={index}
              details={details}
              onSelect={onSelectDetail}
              index={index}
            />
          </Fragment>
        )}
      </List>
    </Box>
  )
}


export default SidePanelList