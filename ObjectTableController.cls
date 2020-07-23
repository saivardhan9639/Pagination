public with sharing class ObjectTableController {
    @AuraEnabled
    public static List<Contact> getRecord(String ObjectName,String[] fieldArray){
        List<Contact> contactList=Database.query('SELECT Id,'+fieldArray[0]+','+fieldArray[1]+','+fieldArray[2]+','+fieldArray[3]+','+fieldArray[4]+' FROM '+ObjectName+' LIMIT 100');
        if(contactList.size()>0){
            return contactList;
        }
        return null;
    }
    @AuraEnabled
    public static void updateContact(Id conId,String firstName,String lastName,String email,String phone,Boolean primary){
        Contact con=new Contact();
        con.Id=conId;
        con.FirstName=firstName;
        con.LastName=lastName;
        con.Email=email;
        con.Phone=phone;
        con.Primary__c=primary;
        if(con!=null){
            update con;
        }
    }
}