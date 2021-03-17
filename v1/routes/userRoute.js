const router = require("express").Router();
const Controller = require("../controllers/index");


//-------------UserModule-----------------------------------
router.post("/sendOtp_Mobile", Controller.userController.addUser);
router.post("/verify_otp", Controller.userController.verify_otp);
router.post("/updateDetails", Controller.userController.updateDetails);
router.post("/pinSetting", Controller.userController.pinSetting);
router.get("/getProfile", Controller.userController.getProfile);
router.post("/sendmail", Controller.userController.sendmail);
router.get("/mailverification/:verificationLink", Controller.userController.mailverification);
router.post("/changesPin",Controller.userController.changesPin);
router.post("/touchStatus",Controller.userController.touchStatus);
router.post("/notification_app_status",Controller.userController.notification_app_status);
router.post("/notification_sms_status",Controller.userController.notification_sms_status);
router.post("/myDetails",Controller.userController.myDetails);
router.post("/update_mobile",Controller.userController.update_mobile);
router.post("/update_mobileDetails",Controller.userController.update_mobileDetails);

router.get("/opaywork",Controller.userController.opaywork);
router.get("/faqs",Controller.userController.Faqsdata);
router.get("/contactus",Controller.userController.contactus);
router.get("/termsPrivacy",Controller.userController.termsPrivacy);
router.get("/delete_user",Controller.userController.delete_user);
router.get("/address_list",Controller.userController.address_data);
router.get("/licence_state",Controller.userController.statelist);

router.post("/sign_in",Controller.userController.logindata);
router.get("/notificationlist",Controller.userController.notificationlist);
router.post("/touch_status",Controller.userController.touch_status);

router.post("/resetNumber",Controller.userController.resetNumber);
router.post("/resetPin",Controller.userController.resetPin)


//----------Bills Modiule----------------------------------------- notificationlist
///notificationlist

router.post("/usernew_bill",Controller.userBill_Controller.newbill);
router.post("/addnew_biller",Controller.userBill_Controller.billerdata);
router.post("/getbiller",Controller.userBill_Controller.getbiller);
router.get("/mybills_current",Controller.userBill_Controller.mybills_current);
router.get("/mybills_settled",Controller.userBill_Controller.mybills_settled);
router.post("/pay_bill",Controller.userBill_Controller.pay_bill);

////mybills_settled

//--------------------Admin Module------------------------------------
router.post("/adminlogin",Controller.admin_Controller.adminlogin);
router.put('/updateAdmin/:id',Controller.admin_Controller.adminupDate);
router.get('/adminProfile/:id',Controller.admin_Controller.adminprofile);
router.post("/admin_adduser",Controller.admin_Controller.adduser);
router.get('/userlist',Controller.admin_Controller.alluserlist);
router.get('/userprofile/:user_OID',Controller.admin_Controller.userprofile);
router.post('/remove_user/:user_OID',Controller.admin_Controller.remove_user);
router.post('/update_user_details/:user_OID',Controller.admin_Controller.update_user_details);

//-------------------
router.post('/opay_work_update',Controller.admin_Controller.opay_work_update); 

router.get('/user_count',Controller.admin_Controller.user_count);
router.get('/current_bills_count',Controller.admin_Controller.current_bills);
router.get('/settled_bills_count',Controller.admin_Controller.settled_bills);
router.get('/verified_id_count',Controller.admin_Controller.verified_id);
router.get('/get_opay_work',Controller.admin_Controller.get_opay_work);

router.put('/faq_update',Controller.admin_Controller.faqlist); 
router.get('/get_faqs',Controller.admin_Controller.get_faq); 
router.put('/contactus_update',Controller.admin_Controller.contactus_update); 
router.get('/get_contactus',Controller.admin_Controller.get_contactus); 
router.put('/terms_privacy',Controller.admin_Controller.terms_privacy);
router.get('/get_terms_privacy',Controller.admin_Controller.get_terms_privacy); 

//-----Add biller

router.post('/billerAdd',Controller.admin_Controller.billerAdd); 
router.get('/get_biller_list',Controller.admin_Controller.get_biller_list);

//settled_bills_list



router.put('/billerUpdate/:Biller_OID',Controller.admin_Controller.billerUpdate);

router.post('/remove_biller/:Biller_OID',Controller.admin_Controller.remove_biller);

router.get('/view_biller/:Biller_OID',Controller.admin_Controller.view_biller);

router.get('/view_bills/:Bill_OID',Controller.admin_Controller.view_bills);

router.post('/remove_bills/:Bill_OID',Controller.admin_Controller.remove_bills);

router.get('/notificationdata_list',Controller.admin_Controller.notificationdata);


router.get('/latest_user',Controller.admin_Controller.someuserlist);

//terms_condition

router.put('/terms_condition',Controller.admin_Controller.terms_condition);
router.get('/get_terms_condition',Controller.admin_Controller.get_terms_condition);


//===================

router.post('/newbills_adds',Controller.admin_Controller.add_newbills);
router.get('/get_newbills/:User_OID',Controller.admin_Controller.get_newbill);


//--------------

router.get('/biller_list',Controller.admin_Controller.biller_count);



router.put('/active_status/:user_OID',Controller.admin_Controller.active_status); 

router.put('/updatebills/:Bill_OID',Controller.admin_Controller.updatebills); 


//----------data_biller_list

router.get('/data_biller_list',Controller.admin_Controller.data_biller_list);

//-------------------- bills_details

router.get('/bills_details',Controller.admin_Controller.bills_details);


//markaspaid

router.put('/markaspaid',Controller.admin_Controller.markaspaid);


router.get('/current_bills_list',Controller.admin_Controller.view_bills_list);

router.get('/settled_bills_list',Controller.admin_Controller.settel_bills_list);

//app_current_bills_list

router.get('/app_current_bills_list',Controller.admin_Controller.app_current_bills_list);
router.get('/app_settled_bills_list',Controller.admin_Controller.app_seleld_bills_list);

router.get('/app_view_bills/:Bill_OID',Controller.admin_Controller.app_view_bills);









//app_view_bills

//updatebills

module.exports = router;
