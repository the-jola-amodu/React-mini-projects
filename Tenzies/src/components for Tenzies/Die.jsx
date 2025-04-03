import './Die.css'

export default function Die(prop){
    return <button 
            onClick={() => prop.hold(prop.id)} 
            className={prop.isHeld ? 'dice good' : (prop.disabled ? 'dice lost' : 'dice')}
            aria-label={`This is a die with a value of ${prop.value}, ${prop.isHeld ? 'held' : 'not held'}`}
            disabled={prop.disabled}
            >
        {prop.number}
    </button>
}