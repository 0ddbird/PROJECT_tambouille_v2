import React, { useState } from 'react'
import { Ingredient } from '../../models/Ingredient'

interface IInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  ingredientsTable: Ingredient[]
  id: string
}

const AutoCompleteInput = ({ value, setValue, ingredientsTable, id }: IInputProps): JSX.Element => {
  const [result, setResult] = useState<Ingredient[] | []>([])

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value
    setValue(inputValue)
    if (inputValue.length > 1) {
      // Search for matching ingredients in the table
      const matchingIngredients = ingredientsTable.filter(ingredient => ingredient.name.includes(inputValue))
      setResult(matchingIngredients)
    } else setResult([])
  }
  return (
    <>
    <input id={id} type="text" value={value} onChange={(event) => handleInputChange(event)}/>
    {
      result.length > 0 &&
      <ul>
        {
          result.map(ingredient => {
            return <li key={`ingredient-${ingredient.id}`} onClick={(e) => setValue(ingredient.name)}>{ingredient.name}</li>
          })
        }
      </ul>
    }
    </>

  )
}

export default AutoCompleteInput
