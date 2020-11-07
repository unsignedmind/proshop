

## Install

`npm install` in /frontend and /backend

GraphQl not setup in the backend
~~npm run codegen~~

#env 
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

This redux setup consists of the following components:
* Generated Actions (custom actions possible)
* State Merger (custom business logic when saving to state)
* Reducer (1 line reducer)

## Actions 

### Generic action creator
This creator is stored in ``src/state/utils``. To Create a action you need 3 things:
* StateModel
* ActionType Enum
* Payload

The StateModel can be imported from the reducer file. The ActionType Enum from the Actions file. Both are located und ``src/state/reducers/REACT_COMPONENTNAME``.

### Use action generator
The payload is type checked. It has a Partial<T> interface of given state model. With the generic creator there are no extra action defintions necessary. Define the attributes which changed in the call. The constructor of the generic creator has a optinal 4th parameter which is a boolean. When set to true then the action loads a custom state merger which is intended to hold some business logic.
Read more about that under **State Merger**.

**Usage**
````typescript#
dispatch(new genericAction<ProductStateModel>(ProductListActionTypes.REQUEST_START, { loading: true }), false);
````  
### Create custom actions
If the generated action reach their limitation then self written actions can be added wit the template below. 

**Usage**
````typescript
export class ProductListRequest extends Action {
    public readonly type = ProductListActionTypes.REQUEST_START;
    public reducer = (state: ProductStateModel) => ({ ...state, loading: this.payload.loading });

    constructor(public payload: Pick<ProductStateModel, 'loading'>) {
        super();
    }
}
````

## State Merger
What is this for? As the name says it merges states. The generated actions include the reducer already. By default the payload of the action overwrite the state. But as there could also be some business logic necessary then a custom merger is needed.
These are stored in ``src/state/state-merger/``. 
To create a new state merger frist add a new class in the ``state-merger`` file. They look like this:

````typescript
export class ProductListRequestStartStateMerger extends StateMerger {
	merge(state: ProductStateModel, payload: Partial<ProductStateModel>): Partial<ProductStateModel> {
		return { ...state, products: payload.products, error: 'State merger says hello :)' };
	}
}
````
* The naming default convention is actionName-StateMerger.
* The class needs to extend the StateMerger base class.
* Implement the merge function and set the types to the StateModel
* Payload must be wrapped in Partial<T>

Optional
* The return type is also wrapped in Partial<T> because otherwise typescript would complain about the undefined Partials adds. 

The class must be added to the map ```state-merger-map``` afterwards.
````typescript
[ProductListActionTypes.REQUEST_START, new ProductListRequestStartStateMerger()]
````
Each entry is a array that consits of the ActionType Enum and a new instance of the state merger class

## Reducer
A universal reducer exists for all generated actions. It can also handle the custom actions.
````typescript
export const productListReducer = (state: ProductStateModel = defaultProductState, action: Action) => universalReducer(state, action);

````


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
