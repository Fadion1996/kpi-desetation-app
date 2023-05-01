import { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material'
import { detailType, stateType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { Settings, ExpandLess, ExpandMore, Edit, Delete, Check } from '@mui/icons-material'
import { detailsActions } from '../../store/details-slice'
import { uiActions } from '../../store/ui-slice'
// const boxStyles = {
//   flexDirection: 'column',
//   display: 'block',
//   cursor: 'pointer',
//   "&:hover": {
//     boxShadow: 8,
//   }
// }

interface ListItemDetail {
  details: detailType[],
  onSelect: (index: number) => void,
  index: number
}

const SidePanelListItem: FC<ListItemDetail> = ({ details, index }) => {

  const dispatch = useDispatch()
  const activeAssembleItem = useSelector((state: stateType) => state.details.activeAssembleItem)

  const [isExpanded, setIsExpanded] = useState(false);

  const settingsList = [{
    id: uuidv4(),
    name: 'Select',
    icon: <Check />,
    onClick: () => dispatch(detailsActions.setActiveAssembleItem(index))
  }, {
    id: uuidv4(),
    name: 'Edit',
    icon: <Edit />,
    onClick: () => {
      dispatch(detailsActions.setSelectedAssembleItem(index))
      dispatch(uiActions.togglePopup(true))
    }
  }, {
    id: uuidv4(),
    name: 'Delete',
    icon: <Delete />,
    onClick: () => {
      dispatch(uiActions.togglePopupNotification({
        title: "Видалити виріб",
        text: "Ви дійсно хоче видалити цей виріб?",
        onSubmit: detailsActions.deleteAssembleItem(index),
        isVisible: true,
      }))
    }
  }]

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const titleItemText = `${details[0].name} - ${details[1].name}`

  return (
    <List key={details[0].id} disablePadding sx={{ background: activeAssembleItem === index ? '#d3d3d3' : '#fff' }}>
      <ListItemButton onClick={handleExpand}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary={titleItemText} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            settingsList.map(({ id, name, icon, onClick }) =>
              <ListItemButton key={id} sx={{ pl: 4 }} onClick={onClick} >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>
    </List >
  )
}

export default SidePanelListItem