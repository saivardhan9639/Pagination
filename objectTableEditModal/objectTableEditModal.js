import { LightningElement,api,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import updateRecord from '@salesforce/apex/ObjectTableController.updateRecord';
export default class ObjectTableEditModal extends LightningElement {
    @api editData;
    
    handleCancel(){
        this.dispatchEvent(new CustomEvent('cancel',{detail:''}));
    }
    handleChange(event){
        if(event.target.label =='First Name'){
            this.editData={Id:this.editData.Id,FirstName:event.target.value,LastName:this.editData.LastName,Email:this.editData.Email,Phone:this.editData.Phone,Primary__c:this.editData.Primary__c};
        }
        if(event.target.label =='Last Name'){
            this.editData={Id:this.editData.Id,FirstName:this.editData.FirstName,LastName:event.target.value,Email:this.editData.Email,Phone:this.editData.Phone,Primary__c:this.editData.Primary__c};
        }
        if(event.target.label==='Email'){
            this.editData={Id:this.editData.Id,FirstName:this.editData.FirstName,LastName:this.editData.LastName,Email:event.target.value,Phone:this.editData.Phone,Primary__c:this.editData.Primary__c};
        }
        if(event.target.label==='Phone'){
            this.editData={Id:this.editData.Id,FirstName:this.editData.FirstName,LastName:this.editData.LastName,Email:this.editData.Email,Phone:event.target.value,Primary__c:this.editData.Primary__c};
        }
        if(event.target.label==='Primary'){
            this.editData={Id:this.editData.Id,FirstName:this.editData.FirstName,LastName:this.editData.LastName,Email:this.editData.Email,Phone:this.editData.Phone,Primary__c:event.target.checked};
        }
    }
    
    handleUpdate(){
        updateRecord({obj:this.editData}).then(result=>{
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