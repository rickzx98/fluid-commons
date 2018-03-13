# Fluid Commons
Commonly used react components with [Fluid-Func](https://github.com/rickzx98/fluid-func) and [Redux](https://redux.js.org/) support.
## Getting Started

### Installation
```bash
    npm install --save fluid-commons
```
#### Fluid-api
- Fluid Api configuration

```javascript
        import { FluidApi } from 'fluid-commons';
        const config = {
            environment: {
                production: { paramForProd: 'hey'},
                development: { paramForDev: 'hey dev'}
            }
            catch: {
                componentError: (error, info)=>{
                    //catches child's component error
                }
                apiError: (error)=>{
                    //catches api call error
                }
            }
        };

        const Api = {
            saveAction: {
                production: (param)=>{
                    const forProd = param.paramForProd();
                    // forProd = "hey"
                },
                development: (param)=>{
                    const forDev = param.paramForDev();
                    // forDev = "hey dev"
                }
            }
        };

 function FluidApiSample() {  
     return (<FluidApi environment="production" config={config} api={Api}>
            <div> content here </div>
            </FluidApi>);
 }
```

- To call an api method
```javascript
    FluidApi.execute('saveAction', {
        anyParam:'anyParam'
    }).then(()=> {
        //success
    }).catch(err=>{
        //failed
    });
```

#### Fluid-button
- Works like a normal html button with the same react attributes as Button but with fluid-func trigger.

```javascript
 import { FluidButton } from 'fluid-commons';
 import FluidFunc from 'fluid-func';

 FluidFunc.create('saveAction', (param)=> {
    const inputParam = param.input();
    //inputParam = "Hello from button!"
 });

 function fluidButtonSample(){
     return (<div>
            <FluidButton action="saveAction" data={{input:'Hello from button!'}}>Save</FluidButton>
      </div>);
 }

```
#### Fluid-form (requires redux)
```javascript
 import { FluidForm } from 'fluid-commons';
 const specs = ({dispatch, formName})=>{
     return [
         {field:'fullname', data: {
             // see fluid-func's tranform, translate and validate
         }},
         {field:'occupation', data: {
              // see fluid-func's tranform, translate and validate
         }}
     ];
 };

 const onSubmit = (value) =>{
     const {fullname, occupation} = value;
 }

 const onFailed = (fluidFuncError) =>{
     const {stackId, error} = fluidFuncError;
     //error.message = "error message"
 };

 function fluidFormSample() {
     return (<FluidForm 
        onFailed={onFailed}
        onSubmit={onSubmit} name="mainForm" specs={}>
        <input name="fullname"/>
        <input name="occupation"/>
        <button type="submit">Submit</button>
     </FluidForm>);
 }
```
Note: Form name is required.

- Using FluidFormReducer

```javascript

    import { FluidFormReducer as fluidForm } from 'fluid-commons';
    const rootReducer = combineReducers({
        fluidForm
    });

```

- Create a container for FluidForm
```javascript
  import { FluidForm } from 'fluid-form'; 
  import { connect } from 'react-redux';
  import React from 'react';

  class FormSample extends React.Component {
      constructor(props){
          super(props);
          this.specs = ({dispatch, formName}) => {
             return [
                {field:'fullname', data: {
                    // see fluid-func's tranform, translate and validate
                }},
                {field:'occupation', data: {
                    // see fluid-func's tranform, translate and validate
                }}
            ];
          }
      }
      onSubmit(value){

      }
      onFailed(){

      }
      render(){
          (<FluidForm specs={specs} name="mainForm" onSubmit={this.onSubmit} onFailed={this.onFailed}></FluidForm>)
      }
  }
  
  function mapStateToProps(state) {
      return {
          mainForm: state.fluidForm.mainForm || {data: {}}
      };
  }

  export const ConnectedFormSample = connect(mapStateToProps)(FormSample);

```

- To clear form fields
```javascript
    FluidForm.clear('mainForm'); // form name
```

- To submit form
```javascript
    FluidForm.submit('mainForm');// form name
```

- To load data to form
```javascript
    FluidForm.load('mainForm', {
        fullname:'John Doe',
        occupation: 'Programmer'
    });
```
- To set value to a specific field
```javascript
    FluidForm.set('mainForm','fullname','John Doe');
```
- To listen to changes of a specific field
```javascript
    FluidForm.on('mainForm','fullname', (value)=> {
        // will trigger every update on the value
    }); 
```
Note: To enable these functionalities "fullname" must be tagged as public. See below:

```javascript
       this.specs = ({dispatch, formName}) => {
             return [
                {field:'fullname', data: {
                    // see fluid-func's tranform, translate and validate
                }, public: true},
                {field:'occupation', data: {
                    // see fluid-func's tranform, translate and validate
                }}
            ];
          }

```

#### Fluid-input

```javascript  
    import { FluidInput, FluidForm } from 'fluid-commons';
    const data = {
        fullname: 'John Doe'.
        occupation: 'Programmer'
    };

     function fluidInputSample() {
     return (<FluidForm 
        onFailed={onFailed}
        onSubmit={onSubmit} name="mainForm" specs={}>
        <FluidInput dataSrc={data} name="fullname"/>
        <FluidInput dataSrc={data} name="occupation"/>
        <button type="submit">Submit</button>
     </FluidForm>);
```

#### Fluid-label
```javascript
   import { FluidLabel } from 'fluid-label';
   
   FluidLabel.setup('mainLabel', {
       en:  {
           appName: 'app name in en'
       },
       dk: {
           appName: 'app name in dk'
       }
   });

    return (<div><FluidLabel locale="en" label="appName" name="mainLabel"/></div>);

```

- Get label using .get static method
```javascript
    FluidLabel.get('mainLabel', 'en', 'appName'); //  app name in en
```

#### Fluid-merged-view 
 Coming soon.
#### Fluid-paginate
 Coming soon.
#### Fluid-table
 Coming soon.