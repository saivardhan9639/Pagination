public with sharing class ObjectTableController {
    @AuraEnabled
    public static List<SObject> getRecord(String objectName,String[] fieldArray){
        List<SObject> dataList=Database.query('SELECT Id,'+fieldArray[0]+','+fieldArray[1]+','+fieldArray[2]+','+fieldArray[3]+','+fieldArray[4]+' FROM '+objectName+' LIMIT 100');
        if(dataList.size()>0){
            return dataList;
        }
        return null;
    }
    @AuraEnabled
    public static void updateRecord(SObject obj){
        if(obj!=null){
            update obj;
        }
        
    }
}