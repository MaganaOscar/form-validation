import react, {useReducer} from 'react';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}


export default() => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const validateInput = (name, value) => {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (name === "firstName") {
            if (value.length < 2 && value.length > 0) {
                return  "First Name must be at least two characters!";
            }
        } else if (name === "lastName") {
            if (value.length < 2 && value.length > 0) {
                return "Last Name must be at least two characters!"
            }
        } else if (name === "email") {
            if (!value.match(mailformat) && value.length > 0) {
                return "Email must have a valid format";
            }
        }
        return null
    }

    function handleChange(e) {
        const {name,value} = e.target;
        const error = validateInput(name, value);
        dispatch({
            type: name,
            payload: {value, error}
        });

    }

    return (
        <div className="main">
            <div>
                <label className="fLabel">
                    <span>First Name:</span>{' '}
                    {
                        state.firstName.error === null ?
                        <input name="firstName" value={state.firstName.value} onChange={handleChange}/>:
                        <input className="borderRed" name="firstName" value={state.firstName.value} onChange={handleChange}/>
                    }
                    {state.firstName.error !== null && (
                        <p className="error">{state.firstName.error}</p>
                    )}
                </label>
            </div>
            <div>
                <label className="fLabel">
                    <span>Last Name:</span>{' '}
                    {
                        state.lastName.error === null ?
                        <input name="lastName" value={state.lastName.value} onChange={handleChange}/>:
                        <input className="borderRed" name="lastName" value={state.lastName.value} onChange={handleChange}/>
                    }
                    {state.lastName.error !== null && (
                        <p className="error">{state.lastName.error}</p>
                    )}
                </label>
            </div>
            <div>
                <label className="fLabel">
                    <span>Email:</span>{' '}
                    {
                        state.email.error === null ?
                        <input name="email" value={state.email.value} onChange={handleChange}/>:
                        <input className="borderRed" name="email" value={state.email.value} onChange={handleChange}/>
                    }
                    {state.email.error !== null && (
                        <p className="error">{state.email.error}</p>
                    )}
                </label>
            </div>
            <button className="btnSubmit">Submit</button>
        </div>
    )
}