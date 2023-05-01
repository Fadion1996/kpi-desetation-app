import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${240}px)` },
        ml: { sm: `${240}px` },
      }}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Складання вісесиметричних деталей
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header