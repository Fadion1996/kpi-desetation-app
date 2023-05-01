import { Drawer } from '@mui/material'
import SidePanelList from './SidePanelList'


const SidePanel = () => {

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <SidePanelList />
    </Drawer>
  )
}

export default SidePanel