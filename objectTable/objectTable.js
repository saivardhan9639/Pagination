import { LightningElement,api,track,wire} from 'lwc';
import getData from '@salesforce/apex/ObjectTableController.getRecord';

export default class ObjectTable extends LightningElement {
    @api objectName='Contact';
    @api fieldNames=['FirstName','LastName','Email','Phone','Primary__c'];
    dataList=[];
    responseList=[];
    @track pageSize=20;
    @track totalRecordCount;
    @track totalPage;
    @track page = 1;
    @track startingRecord=1;
    @track endingRecord=0;
    @track showModal=false;
    @track conId;
    @track editData;
    @track flag=true;
    @track hidePrevious=true;
    @track hideNext=true;
    
    
    
    connectedCallback(){
        this.getData();
    }
    getData(){
        getData({objectName:this.objectName,fieldArray:this.fieldNames}).then(response=>{
            if(response){
                this.responseList=response;
                console.log(JSON.stringify(response));
                if(this.flag){
                    this.initialSetup();
                }
                else{
                    this.displayRecordPerPage(this.page);
                }
            }
        })
        .catch(error=>{
            console.log(error.body.message);
        })
    }
    initialSetup(){
        this.totalRecordCount=this.responseList.length;
        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        this.dataList = this.responseList.slice(0,this.pageSize); 
        this.endingRecord = this.pageSize;
        if(this.totalPage>1){
            this.hideNext=false;
        }
    }
    
    changeHandler(event){
        this.pageSize=event.target.value;
        this.initialSetup();
    }
    handleFirst(){
        this.hidePrevious=true;
        this.initialSetup();
    }
    handlePrevious(){
        if (this.page > 1){
            this.page = this.page - 1; 
            if(this.page==1){
                this.hidePrevious=true;
            }
            this.hideNext=false;
            this.displayRecordPerPage(this.page);
        }
    }
    handleNext(){
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1;
            this.hidePrevious=false;
            if(this.page==this.totalPage){
                this.hideNext=true;
            }
            this.displayRecordPerPage(this.page);            
        }  
    }
    handleLast(){
        this.page=this.totalPage;
        this.hideNext=true;
        this.hidePrevious=false;
        this.displayRecordPerPage(this.totalPage);
    }
    displayRecordPerPage(page){
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 
        this.dataList = this.responseList.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }    
    handleEdit(event){
        this.conId=event.target.name;
        for(let i=0;i<this.dataList.length;i++){
            if(this.conId==this.dataList[i].Id){
                this.editData=this.dataList[i];
            }
        }
        this.showModal=true;
    }
    handleCancel(){
        this.showModal=false;
    }
    handleSave(){
        this.flag=false;
        this.getData();
        this.showModal=false;
        
    }
}
