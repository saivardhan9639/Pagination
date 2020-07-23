import { LightningElement,api,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import updateContact from '@salesforce/apex/ObjectTableController.updateContact';
export default class ObjectTableEditModal extends LightningElement {
    @api conId;
    @api editData;
    @track firstName;
    @track lastName;
    @track email;
    @track phone;
    @track primary;
    connectedCallback(){
        this.firstName=this.editData.FirstName;
        this.lastName=this.editData.LastName;
        this.email=this.editData.Email;
        this.phone=this.editData.Phone;
        this.primary=this.editData.Primary__c;
        console.log(this.conId);
        console.log(JSON.stringify(this.editData));
        
    }
    
    handleCancel(){
        this.dispatchEvent(new CustomEvent('cancel',{detail:''}));
    }
    handleChange(event){
        if(event.target.label =='First Name'){
            this.firstName=event.target.value;
        }
        if(event.target.label =='Last Name'){
            this.lastName=event.target.value;
        }
        if(event.target.label==='Email'){
            this.email=event.target.value;
        }
        if(event.target.label==='Phone'){
            this.phone=event.target.value;
        }
        if(event.target.label==='Primary'){
            this.primary=event.target.checked;
        }
    }
    handleUpdate(){
        updateContact({conId:this.conId,firstName:this.firstName,lastName:this.lastName,email:this.email,phone:this.phone,primary:this.primary}).then(result=>{
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Record updated',
                variant:'success',
            });
            this.dispatchEvent(event);
            this.dispatchEvent(new CustomEvent('save',{detail:''}));
        })
        .catch(error=>{
            console.log('error');
            console.log(error.body.message);
        })
    }
}