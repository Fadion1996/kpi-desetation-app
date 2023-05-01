import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField
} from '@mui/material'
import { detailType, stateType, DataObj } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import { detailsActions } from '../../store/details-slice'


const Popup = () => {

  const [name, setName] = useState('')
  const [height, setHeight] = useState<string | number>('')
  const [outerRadius, setOuterRadius] = useState<string | number>('')
  const [innerRadius, setInnerRadius] = useState<string | number>('')

  const dataInputs = [
    {
      id: 'name',
      label: 'Назва деталі',
      type: "text",
      value: name
    }, {
      id: 'height',
      label: 'Висота деталі',
      type: "number",
      value: height
    }, {
      id: 'outerRadius',
      label: 'Зовнішній радіус',
      type: "number",
      value: outerRadius
    }, {
      id: 'innerRadius',
      label: 'Внутрішній радіус',
      type: "number",
      value: innerRadius
    }
  ]

  const [activeTab, setActiveTab] = useState('first')
  const [errorsField, setErrorsField] = useState<string[]>([])
  const [detailsParams, setDetailsParams] = useState<detailType[]>([])

  const dispatch = useDispatch()
  const popupIsVisible = useSelector((state: stateType) => state.ui.popupIsVisible)
  const activeAssembleItem = useSelector((state: stateType) => state.details.activeAssembleItem)
  const selectedAssembleItem = useSelector((state: stateType) => state.details.selectedAssembleItem)
  const assembleItems = useSelector((state: stateType) => state.details.assembleItems)
  const detailParams = detailsParams.find(detail => detail.type === activeTab) as detailType
  const JsonDetails = JSON.stringify(detailParams)

  useEffect(() => {
    if (selectedAssembleItem !== -1) {
      setDetailsParams(assembleItems[selectedAssembleItem])
    }
  }, [selectedAssembleItem, assembleItems, popupIsVisible, activeAssembleItem])


  useEffect(() => {
    if (!detailParams) {
      setName('')
      setHeight('')
      setOuterRadius('')
      setInnerRadius('')
    } else {
      setName(detailParams.name)
      setHeight(detailParams.height)
      setOuterRadius(detailParams.outerRadius)
      setInnerRadius(detailParams.innerRadius)
    }
  }, [
    activeTab,
    detailParams,
    JsonDetails,
    activeAssembleItem
  ])

  const toggleTab = () => {
    setActiveTab(tab => tab === 'first' ? 'second' : 'first')
  }

  const validate = (value: string | number, type: string) => {
    if (value === '' || value === 0) {
      setErrorsField(prev => [...prev, type])
      return { [type]: value }
    } else {
      setErrorsField(prev => prev.filter(error => error !== type))
    }
  }

  const validateAll = () => {
    const dataObj: DataObj = {
      name: name,
      height: height,
      outerRadius: outerRadius,
      innerRadius: innerRadius
    }

    const validateData = []
    for (let key in dataObj) {
      const validatedValue = validate(dataObj[key as keyof DataObj], key)
      validatedValue && validateData.push(validatedValue)
    }
    return validateData
  }

  const onChangeHandler = (id: string, value: string) => {
    switch (id) {
      case 'name': {
        setName(value)
        break
      }
      case 'height': {
        setHeight(value)
        break
      }
      case 'outerRadius': {
        setOuterRadius(value)
        break
      }
      case 'innerRadius': {
        setInnerRadius(value)
        break
      }
    }
    validate(value, id)
  }

  const onExitHandler = () => {
    setActiveTab('first')
    setDetailsParams([])
    dispatch(uiActions.togglePopup(false))
  }

  const onSubmitHandller = () => {
    const validatedData = validateAll()

    const inputData = {
      id: detailParams ? detailParams.id : Math.random() + '',
      type: activeTab,
      name: name,
      height: +height,
      outerRadius: +outerRadius,
      innerRadius: +innerRadius
    }

    if (errorsField.length === 0 && validatedData.length === 0) {
      if (detailsParams.length === 0) {
        setDetailsParams(prev => [...prev, inputData])
      } else if (detailsParams.length) {
        setDetailsParams([])
        dispatch(uiActions.togglePopup(false))
        const updateDetails = detailsParams.map(detail => detail.type === activeTab ? inputData : detail)
        activeAssembleItem
          ? dispatch(detailsActions.addAssembleItems([...detailsParams, inputData]))
          : dispatch(detailsActions.updateAssembleItems([...updateDetails]))
      }
      toggleTab()
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog
      fullScreen={false}
      open={popupIsVisible}
      onClose={onExitHandler}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Додати нову схему складання"}
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="first" label="Базова деталь" />
          <Tab value="second" label="Приєднуавльна деталь" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          <Typography>Вкажіть параметри які відповідають {activeTab === 'first' ? 'базової' : 'приєднувальної'} деталі</Typography>
          {
            dataInputs.map((input) =>
              <TextField
                id={input.id}
                key={input.id}
                label={input.label}
                type={input.type}
                margin="dense"
                onChange={(e) => onChangeHandler(input.id, e.target.value)}
                error={errorsField.includes(input.id)}
                helperText={errorsField.includes(input.id) && "Неправильні вхідні данні."}
                fullWidth
                value={input.value}
              />
            )
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onExitHandler}>
          Відмінити
        </Button>
        <Button autoFocus onClick={onSubmitHandller}>
          {detailsParams.length >= 1 ? 'Підтвердити' : 'Додати деталь'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup