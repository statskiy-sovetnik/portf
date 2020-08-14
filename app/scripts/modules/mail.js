define(['jquery'], function () {
   var mail = {};
   
   function is_mail_valid(email_obj) {
       return !(email_obj.toString().indexOf("@") === -1);
   }

   mail.is_mail_valid = is_mail_valid;
   
   return mail;
});