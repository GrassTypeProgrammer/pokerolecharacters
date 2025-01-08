import './../styles/components/EditableTextField.css'
import { ComponentProps } from '../components/Component'
import classNames from 'classnames'
import { useState } from 'react';


type Props = ComponentProps & {
    id: string;
    value?: string;
    label?: string;
    onSubmit: (value: string) => void;
}



export default function EditableTextField (props: Props) {
    const [editMode, setEditMode] = useState(false);
    const [newValue, setNewValue] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onSelect(event: React.MouseEvent<HTMLInputElement>){
        if(!editMode){
            setEditMode(true);
        }
    }

    // TODO: What type does this need?
    function handleSubmit(event){
        event.preventDefault();
        props.onSubmit(newValue)
        setEditMode(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setNewValue(event.currentTarget.value)
    }

    function onLoseFocus(){
        setEditMode(false);
    }


    return  <div className={classNames('EditableTextField_root', props.baseClassName, props.classModifiers)}
                onClick={onSelect}
            >
                {props.label &&
                    <div className='EditableTextField_label'>{props.label}</div>
                }
                {editMode ?
                    <form id={`EditableTextField_${props.id}`} onSubmit={handleSubmit}>
                        <input onBlur={onLoseFocus} autoFocus className='EditableTextField_input' type='text' defaultValue={props.value} onChange={handleChange}/>
                    </form>
                    :
                    <div className='EditableTextField_value'>{props.value}</div>
                }
            </div>

}