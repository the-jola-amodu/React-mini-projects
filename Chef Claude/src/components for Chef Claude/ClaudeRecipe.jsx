import Markdown from 'react-markdown'
import './ClaudeRecipe.css'

export default function ClaudeRecipe(props){
    return <section id='recipe'>
        <Markdown>{props.recipe}</Markdown>
    </section>
}