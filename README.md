# ProSop
Project created with instructions from the MERN eCommerce course by Brad Traversy (Traversy Media). 
The project was not created entirely according to the instructions of the course. The difference:
 * is that typscript is used on the frontend and the backend.
 * linters are configured
 * SCSS is used
 * naming convention different
 * file names differ
 * the Redux setup is different
 * I did not finish the course yet
 
Course Repo: https://github.com/bradtraversy/proshop_mern

## Install

`npm install` in /frontend and /backend

GraphQl not setup in the backend
~~npm run codegen~~

# env 
add .env file in /backend with the following keys
````
NODE_ENV=development
PORT=8000
MONGO_URI=
````

## Run App

`npm start` in /frontend
`npm start:dev`  in/backend

# React Apollo Client

Typescript based WebShop written in Typescript with Redux State Management

---
# Redux Setup
This setup aims to remove as much boilerplate code as possible.

The redux setup consists of the following components:
* Generated Actions (custom actions possible)
* State Merger (custom business logic when saving to state)
* Reducer (1 line reducer)

## State
```typescript
export interface State {
	readonly name: StateName;
}

export enum StateName {
	APP_STATE = 'appState',
	PRODUCT_LIST_STATE = 'productListState',
}

export interface AppStateModel extends State {
	[StateName.PRODUCT_LIST_STATE]: ProductListStateModel;
}

export const defaultAppState: AppStateModel = {
	name: StateName.APP_STATE,
	[StateName.PRODUCT_LIST_STATE]: defaultProductState,
};

export interface ProductListStateModel extends State {
	products: Maybe<Array<ProductDTO>>;
	loading: Maybe<boolean>;
	error: Maybe<string>;
}
```
Each state has a name. The names are stored in an enum. All states are part of the App state. The attributes of a state can be also be null or undefined(via Maybe type). This is because payloads are defined for each state as Partial<T> and would not pass the type check because the payload contains only the attributes that have changed.   

## Actions 
### Generic action creator
This creator is stored in `src/state/utils`. To Create an action you need 4 things:
* StateModel
* ActionType Enum
* Payload
* Name of the state or boolean

The StateModel & ActionType Enum are stored in the component directory.

### Use action generator
The payload is type checked. It has a Partial<T> interface of given state model. With the generic creator there are no extra action definitions necessary. Define the attributes which changed in the call.
The constructor of the generic creator has 2 optional parameters. The stateName and a boolean value. 
* useCustomStateMerger(boolean): When the boolean is set to true then the action loads a custom state merger which is intended to hold some business logic added by the developer. Read more about that under **State Merger**.
* stateName(StateName): If the useCustomStateMerger flag is false or undefined the default merger is used. The default merger needs to know to which state the payload should be applied to.  

**Usage**
```typescript
dispatch(new genericAction<ProductStateModel>(ProductListActionTypes.REQUEST_START, { loading: true }), StateName.PRODUCT_LIST_STATE, false);
``` 
### Create custom actions
If the generated actions reach their limitations then self written actions can be added with the template below. 

**Usage**
```typescript
export class ProductListRequestAction extends Action {
    public readonly type = SomeActionTypes.ActionName;
    public reducer = (state: AppStateModel) => ({ ...state, ...payload });

    constructor(public payload: Pick<AppStateModel, 'name'>) {
        super();
    }
}
```

## State Merger
What is this for? As the name says it merges states. 

# Default Merger
Based on the state name provided in the genericAction call the default state merger applies the payload to the correct state. That's possible because the state name equal the state attribute name in the app state model.

# Custom Merger
The generated actions include the reducer, and the action class has a flag named useCustomStateMerger. If true then the reduce function of that action gets a state merger from a map and runs the merge function. By default the payload of the action overwrites the state. But as there could also be some business logic necessary then a custom merger is needed. These are stored in `src/state/state-merger/`. 
To create a new state merger first add a new class in the `state-merger` file. They look like this:

```typescript
export class ProductListRequestStartStateMerger extends DefaultStateMerger {
	merge(state: AppStateModel, payload: Partial<ProductListStateModel>): AppStateModel {
		return {
			...state,
			productListState: {
				...state.productListState,
				loading: payload.loading,
				error: 'State Merger working',
			},
		};
	}
}
```
Naming & Types
* The naming default convention is actionNameStateMerger.
* The class needs to extend the StateMerger base class.
* Implement the merge function and set the types to the StateModel
* Payload must be wrapped in Partial<T>
* The return type  must be AppStateModel.

Merge
* make sure to make a copy of the app state itself and a copy of the state you want to update to avoid "Common Mistake #2: Only making a shallow copy of one level"

The class must be added to the map `state-merger-map`afterwards.

```typescript
[ProductListActionTypes.REQUEST_START, new ProductListRequestStartStateMerger()]
```
Each entry is an array that consists of the ActionType Enum, and a new instance of the state merger class

## Reducer
A universal reducer exists for all generated actions. It can also handle the custom actions. Since the logic of the reducer is "outsourced" the original reducer is a one-liner. 
```typescript
export const appStateReducer = (state: AppStateModel = defaultAppState, action: Action) => universalReducer(state, action);

```


---
## React Default Description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
