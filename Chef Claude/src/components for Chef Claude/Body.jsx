import { useEffect, useRef, useState } from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from './ai'
import './Body.css'
import { TrophySpin } from 'react-loading-indicators'

export default function Main(){

    const [ingredients, setIngredients] = useState(["rice", "beans", "tomatoes", "spices"])
    const [recipe, setRecipe] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)

    function submitIngredient(formData){
        const newIngredient = formData.get('ingredient')
        setIngredients((prevIngredients) => ([...prevIngredients, newIngredient]))
    }

    function deleteIngredient(index) {
        setIngredients(prevIngredients => {
            const newIngredients = [...prevIngredients]
            newIngredients.splice(index, 1)
            return newIngredients
        })
    }

    const recipeSection = useRef(null)
    console.log(recipeSection)

    async function createRecipe(){
        setButtonClicked(true)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    useEffect(() => {
        if (recipe !== '' && recipeSection.current !== null){
            setButtonClicked(false)
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipe])

    var recipeDisplay = null

    if(recipe){
        recipeDisplay = recipe
    }
    else if(buttonClicked){
        recipeDisplay = <TrophySpin color={["#595957", "#f5d271", "#ccccca"]} size="medium" text="" textColor="" />
    }

    return <main>
        <form action={submitIngredient} className='add-ingredient-form'>
            <input 
            aria-label='Add ingredient'
            placeholder='e.g. rice'
            type="text"
            name='ingredient'
            className='add-ingredient-input' />
            <button className='add-ingredient-button'>+ Add ingredient</button>
        </form>
        <IngredientsList 
            ref={recipeSection} 
            ingredients={ingredients} 
            handleClick={createRecipe}
            onDeleteIngredient={deleteIngredient}
        />
        {recipeDisplay}
    </main>
}
