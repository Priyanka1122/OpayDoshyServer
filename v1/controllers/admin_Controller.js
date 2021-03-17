const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const OpayWork =require("../../models/opaywork");
const model= require("../../models/index");
const { required } = require('joi');
const jwt = require('jsonwebtoken');
const config =require("config");
const nodeMailer = require('nodemailer');
var crypto = require('crypto');
const fs = require('fs');
const Customer = require("../../models/customer");
const validator = require('validator');
const substringFunction = require('../../logic/substringHandling');
const Faqs=require("../../models/faqs");
const Contactus=require("../../models/contactus");
const termsPrivacy=require("../../models/termsPrivacy");
const BordBiller =require("../../models/onbordBiller");
const NewBill =  require("../../models/newBill");
const arraySort = require('array-sort');
const filesUpload = require('../../logic/uploadFiles').uploadFile;
const Notificationlist=require("../../models/notificationlist");
const Admin =require("../../models/admin");
const termsCondition =require("../../models/termsCondition");
const filesUpload2 = require('../../logic/uploadFile1').uploadFile1;
const sendEmail = require('../../logic/send_email') //function to send the email
//console.log(filesUpload2)
const timestamp = Date.now();
const { body } = require("express-validator");
exports.adminlogin=adminlogin;
exports.adminupDate=adminupDate;
exports.adminprofile=adminprofile;
exports.adduser=adduser;
exports.alluserlist=alluserlist;
exports.userprofile=userprofile;
exports.remove_user=remove_user;
exports.update_user_details=update_user_details;
exports.opay_work_update=opay_work_update;
exports.user_count=user_count;
exports.current_bills=current_bills;
exports.settled_bills=settled_bills;
exports.verified_id=verified_id;
exports.get_opay_work=get_opay_work;
exports.faqlist=faqlist;
exports.get_faq=get_faq;
exports.contactus_update=contactus_update;
exports.get_contactus=get_contactus;
exports.terms_privacy=terms_privacy;
exports.get_terms_privacy=get_terms_privacy;
exports.billerAdd=billerAdd;
exports.get_biller_list=get_biller_list;
exports.current_bills_list=current_bills_list;
exports.settled_bills_list=settled_bills_list;
exports.billerUpdate=billerUpdate;
exports.remove_biller=remove_biller;
exports.view_biller=view_biller;
exports.view_bills=view_bills;
exports.remove_bills=remove_bills;
exports.notificationdata=notificationdata;
exports.someuserlist=someuserlist;
exports.terms_condition=terms_condition;
exports.get_terms_condition=get_terms_condition;
exports.add_newbills=add_newbills;
exports.get_newbill=get_newbill;
exports.biller_count=biller_count;
exports.active_status=active_status;
exports.updatebills=updatebills;
exports.data_biller_list=data_biller_list;
exports.bills_details= bills_details;
exports.markaspaid=markaspaid;
exports.view_bills_list=view_bills_list;
exports.settel_bills_list=settel_bills_list;
exports.app_current_bills_list=app_current_bills_list;
exports.app_seleld_bills_list=app_seleld_bills_list;
exports.app_view_bills=app_view_bills;


async function adminlogin(req,res,next) {

     try{
        const {admin_email,password} =req.body;
        if (admin_email === undefined || admin_email === null || admin_email === "") return res.json({ status: false, msg: 'Please provide the E-mail / User Name.' });
        if (password === undefined || password === null || password === "") return res.json({ status: false, msg: 'Please provide the password.'  });

        // const admin=new Admin({
        //     email:email,
        //     password:password
        // })

        // admin.save((err) => {
        //     if (err) {
        //             console.log(err);
        //             const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
        //             return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
        //           }
        //           else {
                    
        //             return res.status(200).send({ status: true, data:User })
        //           }
        //       })
       
        

        User = await Admin.findOne({ admin_email });
        if (!User || User === undefined) return res.status(409).json({ status: false, msg: 'No admin exist.' });
         if(User.password ==password){
           return res.send({ status: true,msg: 'Login Successful.', data: User })
      }
          else{
          return res.send({ status: true,msg: 'Invalid pin number.'})
          }


     }
    catch (err) {
        return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
      }
}

async function adminupDate(req,res,next) {
     try{

         var ERRORS = ['', null, undefined];

          let{ id} =req.params
      
          const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
          console.log(req.files.image)
          const data = req.body;
          data.image = uploadFile[0].imageName;
          var uploadedPic = uploadFile[0].imageName;
          var data1 = data.image
          console.log("+++++++++++++++++++++++++++",data1)
         let { admin_name, admin_email, admin_phone,password,admin_address,admin_country,admin_state,newpassword } = req.body;
         
           User = await Admin.findOne({ _id:id });
          if (User === null || User === undefined || !User) return res.json({ status: false, msg: `Admin doesn't exist.`});

          if (admin_name === undefined || admin_name === null || admin_name === ""){
               var admin_name1=User.admin_name;
               }
              else{
               var admin_name1=admin_name;
               }


          if (admin_email === undefined || admin_email === null || admin_email === ""){
           var admin_email1=User.admin_email;
                }
          else{
           var admin_email1=admin_email;
           }

           if (admin_phone === undefined || admin_phone === null || admin_phone === ""){
               var admin_phone1=User.admin_phone;
                    }
              else{
               var admin_phone1=admin_phone;
               }

               if (admin_address === undefined || admin_address === null || admin_address === ""){
                    var admin_address1=User.admin_address;
                         }
                   else{
                    var admin_address1=admin_address;
                    }
     
                    if (admin_country === undefined || admin_country === null || admin_country === ""){
                         var admin_country1=User.admin_country;
                              }
                        else{
                         var admin_country1=admin_country;
                         }

                         if (admin_state === undefined || admin_state === null || admin_state === ""){
                              var admin_state1=User.admin_state;
                                   }
                             else{
                              var admin_state1=admin_state;
                              }

                              // if (admin_image === undefined || admin_image === null || admin_image === ""){
                              //      var admin_image1=User.admin_image;
                              //           }
                              //     else{
                              //      var admin_image1=data1;
                              //      }



                                 if (newpassword === undefined || newpassword === null || newpassword === ""){
                                  var password2=User.password;

                             }
                             else{
                                  var password2=newpassword
                              }





                                  //  if (password === undefined || password === null || password === ""){
                                  //       var password1=User.password;
                                  //            }
                                  //      else{
                                      
                                  //       if(User.password ==password){

                                  //            if (newpassword === undefined || newpassword === null || newpassword === ""){
                                  //                 var password1=User.password;

                                  //            }
                                          //    else{
                                          //         var password1=newpassword
                                          //     }

                                          //  }
                                          //  else{
                                          //    var password1=User.password;
                                          //    }
                                          // }

                                          var newData = 
                                          {
                                             admin_name:admin_name1,
                                             admin_email:admin_email1,
                                             admin_phone:admin_phone1,
                                             password:password2,
                                             admin_address:admin_address1,
                                             admin_country:admin_country1,
                                             admin_state:admin_state1,
                                              
                                           
                                          }


                               if (ERRORS.indexOf(uploadedPic) >= 0) {
                                  
                                 }
                           
                                 else {
                                    newData['admin_image'] = data1
                                   
                                 }
                                        

                                     Admin.updateMany({_id:id}, newData, function(err, affected, resp) {
                                            Admin.findOne({ _id:id }, (err, data) => {

                                              if (!err) {
                                                return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                                              }
                                              else {
                                                return res.send({ status: true,msg: 'Data not found' })
                                              }
                                            })
                                          })

                                         
                                          

 }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
}

async function adminprofile(req,res,next) {
     try{
     let{ id} =req.params

     Admin.findOne({ _id:id }, (err, data) => {

          if (!err) {
            return res.send({ status: true,msg: 'Admin Profile Data.', data: data })
          }
          else {
            return res.send({ status: true,msg: 'Data not found' })
          }
        })

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }

     
}

//------------------user Module--------------------------

async function adduser(req,res,next) {

     try{
          const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
          console.log(req.files.image)
          const data = req.body;
          data.image = uploadFile[0].imageName;
          var data1 = data.image
          

          let { first_name, middle_name, last_name,address,dob,mobile,email,licenceState,licenceNumber,pin } = req.body;

          if (first_name === undefined || first_name === null || first_name === "") return res.json({ status: false, msg: 'Please provide the first name.' });
          var checkname = validator.isAlpha(first_name);
           if(!checkname) return res.json({status:false,msg:'Invalid First Name'});
        
       
          if (last_name === undefined || last_name === null || last_name === "") return res.json({ status: false, msg: 'Please provide the last name.' });
       
          var checkname1 = validator.isAlpha(last_name);
           if(!checkname1) return res.json({status:false,msg:'Invalid Last Name'});

           if (mobile === undefined || mobile === null || mobile === "") return res.json({ status: false, msg: 'Please provide the phone number.' });
          if (address === undefined ||address === null || address === "") return res.json({ status: false, msg: 'Please provide the address.' });
          if (dob === undefined ||dob === null || dob === "") return res.json({ status: false, msg: 'Please provide the dob.' });
          if (email  === undefined ||email  === null || email  === "") return res.json({ status: false, msg: 'Please provide the email.' });
         // if (licenceState === undefined ||licenceState === null || licenceState === "") return res.json({ status: false, msg: 'Please provide the licenceState.' });
       
         // if (licenceNumber  === undefined ||licenceNumber  === null || licenceNumber  === "") return res.json({ status: false, msg: 'Please provide the licenceNumber.' });
      
          if (pin  === undefined ||pin  === null || pin  === "") return res.json({ status: false, msg: 'Please provide the password.' });

          let user = await Customer.findOne({ email: email});//Finding the specific User
          if(user){
               return res.json({ status: false, msg: 'This email already exists.'});
         }
         let user1 = await Customer.findOne({ mobile: mobile});//Finding the specific User
          if(user1){  
               return res.json({ status: false, msg: 'This phone number already exists.'});
           }

          
           let user2 = await Customer.find({}).sort({_id:-1}).limit(1);
           
           if(user2.length>0){
           var text = user2[0].user_OID;
           var n =text;
         var data3 = n.replace(/(\d+)/, (match)=>("0".repeat(8)+(++match)).substr(-8));
           }
           else{
             var data3="UR00000001"
           }
           

           let auth_create1 = crypto.randomBytes(30).toString('hex');
           const customer = new Customer({
              user_OID:data3,
              first_name:first_name,
              middle_name:middle_name,
              last_name:last_name,
              address:address,
              dob:dob,
              mobile:mobile,
              email:email,
              licenceState:licenceState,
              licenceNumber:licenceNumber,
              pin:pin,
              image:data1,
              auth_key:auth_create1,
              createdAt: timestamp,
                 })

                 customer.save((err) => {
                    if (err) {
                            console.log(err);
                            const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
                            return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
                          }
                          else {
                          return res.status(200).send({ status: true,msg: 'User added successfully.',data: customer})
                          }
                      })

 }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     

}

//----------------all user list--------------------------
async function alluserlist(req,res,next) {
     try{
          // Customer.find((err, data) => {
          //      if (!err) {
                 
          //          return res.send({ status: true,msg: 'All User List.', data: data })
          //        }
          //        else {
          //          data1=[]
          //          return res.send({ status: true,msg: 'Data not found',data:data1 })
          //        }
          //      })

          Customer.find({}).sort({_id:-1}).exec(function(err,docs) {
            return res.send({ status: true,msg: 'All User List.', data: arraySort(docs,  ['user_OID'], {reverse: false})})
          });

     }
 catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

//----------------user profile-------------------------------------
async function userprofile(req,res,next) {
     try{

          let{ user_OID} =req.params
          

          let userdata=await Customer.findOne({ user_OID: user_OID});
          

    if(userdata){
      return res.send({ status: true,msg: 'User Profile Data.', data: userdata });
    }
    else{
      data=[]
      return res.send({ status: true,msg: 'Data not found',data:data });
    }

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
}

//-----------------------Delete User------------

async function  remove_user(req,res,next) {
     try{
          let{ user_OID} =req.params
       Customer.deleteOne({user_OID: user_OID} ,function(err, affected, resp) {
      
   })
   
   return res.send({status: true , msg: 'Account Delete Successfully.' })
   
   
     }
     catch (err) {
       return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
     }
     
   }

//------------------------Update User-------------------------
async function update_user_details(req,res,next) {
     try{
          let{ user_OID} =req.params
          const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
          console.log(req.files.image) 
          const data = req.body;
          data.image = uploadFile[0].imageName;
          var data1 = data.image

          let { first_name, middle_name, last_name,address,dob,mobile,email,licenceState,licenceNumber,newpin,pin, notes, active_status } = req.body;

          User = await Customer.findOne({ user_OID:user_OID });

          var EmailExists = await Customer.findOne({ user_OID: { "$ne": user_OID}, email:  email});

          if(EmailExists!=null){
            console.log('not coming');

                     
                     return res.json({ status: false, msg: `This email is being used by another user.`});
          }else{


          if (User === null || User === undefined || !User) return res.json({ status: false, msg: `User doesn't exist.`});

          if (first_name === undefined || first_name === null ||first_name === ""){
               var first_name1=User.first_name;
               }
              else{
               var first_name1=first_name;
               }

               console.log("----------------------------------------",first_name1)
         
               if (middle_name === undefined || middle_name === null ||middle_name === ""){
                    var middle_name1=User.middle_name;
                    }
                   else{
                    var middle_name1=middle_name;
                    }

                   // console.log("----------------------------------------",middle_name1)
                    if (last_name === undefined || last_name === null ||last_name === ""){
                         var last_name1=User.last_name;
                         }
                        else{
                         var last_name1=last_name;
                         }

                        // console.log("----------------------------------------",last_name1)

                         if (address === undefined || address === null ||address === ""){
                              var address1=User.address;
                              }
                             else{
                              var address1=address;
                              }

                              if (dob === undefined || dob === null ||dob === ""){
                                   var dob1=User.dob;
                                   }
                                  else{
                                   var dob1=dob;
                                   }

                                   if (mobile === undefined || mobile === null ||mobile === ""){
                                        var mobile1=User.mobile;
                                        }
                                       else{
                                        var mobile1=mobile;
                                        }
                                        if (email === undefined || email === null ||email === ""){
                                             var email1 = User.email;
                                             }
                                            else{
                                             var email1 = email;
                                             }

                                             if (licenceState === undefined || licenceState === null ||licenceState === ""){
                                                  var licenceState1=User.licenceState;
                                                  }
                                                 else{
                                                  var licenceState1=licenceState;
                                                  }

                                                  if (licenceNumber === undefined || licenceNumber === null ||licenceNumber === ""){
                                                       var licenceNumber1=User.licenceNumber;
                                                       }
                                                      else{
                                                       var licenceNumber1=licenceNumber;
                                                       }
                                                       if (licenceNumber === undefined || licenceNumber === null ||licenceNumber === ""){
                                                            var licenceNumber1=User.licenceNumber;
                                                            }
                                                           else{
                                                            var licenceNumber1=licenceNumber;
                                                            }

                                                            if (req.body.image == undefined) {
                                                                 var image1 = User.image;
                                                               }
                                                         
                                                               else if (data1 == "public/images/default/main.png") {
                                                                 var image1 = User.image
                                                               }
                                                               else {
                                                         
                                                                 var image1 =  data1;
                                                               }
                                                               
                                                               if (pin === undefined || pin === null || pin === ""){
                                                                 var password1=User.pin;
                                                                      }
                                                                else{
                                                               
                                                                 if(User.pin ==pin){
                         
                                                                      if (newpin === undefined || newpin === null || newpin === ""){
                                                                           var password1=User.pin;
                         
                                                                      }
                                                                      else{
                                                                           var password1=newpin
                                                                       }
                         
                                                                    }
                                                                    else{
                                                                      var password1=User.pin;
                                                                      }
                                                                   }

                                                              if(User.email == email){

                                                                      console.log('will not send email');

                                                              }else{
                                                                console.log('will send email');
                                                                sendmail1(email, User.auth_key);

                                                              }
                                                                 

                                                                  Customer.updateMany({user_OID:user_OID}, {
                                                                      first_name:first_name1,
                                                                      middle_name:middle_name1,
                                                                      last_name:last_name1,
                                                                      address:address1,
                                                                      dob:dob1,
                                                                      mobile:mobile1,
                                                                      email:email1,
                                                                    //  licenceState:licenceState1,
                                                                     // licenceNumber:licenceNumber1,
                                                                      pin:password1,
                                                                      notes:notes,
                                                                      image:image1,
                                                                      updatedAt:timestamp,
                                                                       active_status:active_status

                                                                     }, function(err, affected, resp) {
                                                                      // console.log("------------------Neeraj",err)


                                                                       
                                                                      Customer.findOne({ user_OID:user_OID }, (err, data1) => {
                         
                                                                        if (!err) {
                                                                          //console.log(data1)
                                                                          return res.send({ status: true,msg: 'Details updated Successfully.', data: data1 })
                                                                        }
                                                                        else {
                                                                          return res.send({ status: true,msg: 'Data not found' })
                                                                        }
                                                                      })
                                                                   })



          }

                                
     
     }
     catch (err) {
      console.log(err);
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
}

async function user_count(req,res,next) {
     try{
     
          const estimate = await Customer.estimatedDocumentCount();
        
          data1={
               users_count:estimate

          }

          return res.send({ status: true,msg: 'Users Count.', data: data1 })


     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function current_bills(req,res,next) {
     try{
          const estimate = await NewBill.countDocuments({Bill_Status: false});
        
          data1={
               current_bill_count:estimate

          }

          return res.send({ status: true,msg: 'Current Bulls count.', data: data1 })

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function settled_bills(req,res,next) {
     try{
          const estimate = await NewBill.countDocuments({Bill_Status: true});
        
          data1={
               settled_bill_count:estimate

          }

          return res.send({ status: true,msg: 'Settled Bulls count.', data: data1 })

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function verified_id(req,res,next) {
     try{
          //const estimate = await Customer.estimatedDocumentCount();
        
          data1={
               Verified_id:0

          }

          return res.send({ status: true,msg: 'Verified_ids count.', data: data1 })

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}
//-------------------------Page Module------------------------------------------------------------

async function opay_work_update(req,res,next) {
     try{
          const { title,description } = req.body;
              //User validation.
   let user = await OpayWork.findOne({ id: 1});//Finding the specific Data

   if (title === undefined || title === null ||title === ""){
     var title1=user.title;
     }
    else{
     var title1=title;
     }

     if (description === undefined || description === null ||description === ""){
          var description1=user.description;
          }
         else{
          var description1=description;
          }

          const timestamp = Date.now();
          OpayWork.updateMany({id: 1}, {
               title:title1,
               description:description1,
               updatedAt: timestamp,
             

              }, function(err, affected, resp) {
              //console.log(resp);
            })

            OpayWork.findOne({ id: 1 }, (err, data) => {
                         
               if (!err) {
                 return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
               }
               else {
                 return res.send({ status: true,msg: 'Data not found' })
               }
             })





     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function get_opay_work(req,res,next) {
     try{
            OpayWork.findOne({ id: 1 }, (err, data) => {
                         
               if (!err) {
                 return res.send({ status: true,msg: 'Opay Work.', data: data })
               }
               else {
                 return res.send({ status: true,msg: 'Data not found' })
               }
             })

     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}
//Faqs
async function faqlist(req,res,next) {
     try{
          const { title,faqs_description } = req.body;

          let Faqlist = await Faqs.findOne({ id: 1});//Finding the specific Data

          if (title === undefined || title === null ||title === ""){
               var title1=Faqlist.title;
               }
              else{
               var title1=title;
               }

               if (faqs_description === undefined || faqs_description === null ||faqs_description === ""){
                    var faqs_description1=Faqlist.faqs_description;
                    }
                   else{
                    var faqs_description1=faqs_description;
                    }

                    const timestamp = Date.now();
                    Faqs.updateMany({id: 1}, {
                         title:title1,
                         faqs_description:faqs_description1,
                         updatedAt: timestamp,
                         
                       
          
                        }, function(err, affected, resp) {
                        //console.log(resp);
                      })

                      Faqs.findOne({ id: 1 }, (err, data) => {
                         
                         if (!err) {
                           return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                         }
                         else {
                           return res.send({ status: true,msg: 'Data not found' })
                         }
                       })
          


     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function  get_faq(req,res,next) {

     Faqs.findOne({ id: 1 }, (err, data) => {
                         
          if (!err) {
            return res.send({ status: true,msg: 'Faqs .', data: data })
          }
          else {
            return res.send({ status: true,msg: 'Data not found' })
          }
        })
     
}

//-contactus

async function contactus_update(req,res,next) {
     try{
          const { title,contact_number,description } = req.body;

          let Contactuslist = await Contactus.findOne({ id: 1});//Finding the specific Data
      

          if (title === undefined || title === null ||title === ""){
               var title1=Contactuslist.title;
               }
              else{
               var title1=title;
               }

               if (contact_number === undefined || contact_number === null ||contact_number === ""){
                    var contact_number1=Contactuslist.contact_number;
                    }
                   else{
                    var contact_number1=contact_number;
                    }
                    //description

                    if (description === undefined || description === null ||description === ""){
                      var description1=Contactuslist.description;
                      }
                     else{
                      var description1=description;
                      }

                 const timestamp = Date.now();
                    Contactus.updateMany({id: 1}, {
                         title:title1,
                         contact_number:contact_number1,
                         description:description1,
                         updatedAt: timestamp,
                         
                       }, function(err, affected, resp) {
                        //console.log(resp);
                      })

                      Contactus.findOne({ id: 1 }, (err, data) => {
                         
                         if (!err) {
                           return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                         }
                         else {
                           return res.send({ status: true,msg: 'Data not found' })
                         }
                       })
          


     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function  get_contactus(req,res,next) {

     Contactus.findOne({ id: 1 }, (err, data) => {
                         
          if (!err) {
            return res.send({ status: true,msg: 'Contactus .', data: data })
          }
          else {
            return res.send({ status: true,msg: 'Data not found' })
          }
        })
     
}

//--TERM

async function terms_privacy(req,res,next) {
     try{
          const { title,privacy } = req.body;

          let Contactuslist = await termsPrivacy.findOne({ id: 1});//Finding the specific Data
      

          if (title === undefined || title === null ||title === ""){
               var title1=Contactuslist.title;
               }
              else{
               var title1=title;
               }

               if (privacy === undefined || privacy === null ||privacy === ""){
                    var privacy1=Contactuslist.privacy;
                    }
                   else{
                    var privacy1=privacy;
                    }
                   

                    const timestamp = Date.now();
                    termsPrivacy.updateMany({id: 1}, {
                         title:title1,
                         privacy:privacy1,
                         updatedAt: timestamp,
                         
                       
          
                        }, function(err, affected, resp) {
                        //console.log(resp);
                      })

                      termsPrivacy.findOne({ id: 1 }, (err, data) => {
                         
                         if (!err) {
                           return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                         }
                         else {
                           return res.send({ status: true,msg: 'Data not found' })
                         }
                       })
          


     }
     catch (err) {
          return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
        }
     
}

async function  get_terms_privacy(req,res,next) {

     termsPrivacy.findOne({ id: 1 }, (err, data) => {
                         
          if (!err) {
            return res.send({ status: true,msg: 'Terms Privacy .', data: data })
          }
          else {
            return res.send({ status: true,msg: 'Data not found' })
          }
        })
     
}


async function billerAdd(req,res,next) {
     try{
          const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
          console.log(req.files.image)
          const data = req.body;
          data.image = uploadFile[0].imageName;
          var data1 = data.image

  const {Biller_Name,Biller_Entity_Legal_Name,Biller_ABN_ACN,Biller_Business_Address,Biller_Postal_Address,Biller_Contact_Person,Biller_Contact_Number,Biller_Contact_Email}=req.body;
   
    if (Biller_Name === undefined || Biller_Name === null || Biller_Name === "") return res.json({ status: false, msg: 'Please provide the biller name.' });
 
    if (Biller_Entity_Legal_Name === undefined || Biller_Entity_Legal_Name === null || Biller_Entity_Legal_Name === "") return res.json({ status: false, msg: 'Please provide the biller Legal name.' });

    if (Biller_ABN_ACN === undefined || Biller_ABN_ACN === null || Biller_ABN_ACN === "") return res.json({ status: false, msg: 'Please provide the Biller_ABN_ACN.' });

    if (Biller_Business_Address === undefined || Biller_Business_Address === null || Biller_Business_Address === "") return res.json({ status: false, msg: 'Please provide the Biller_Business_Address.' });

    if (Biller_Postal_Address === undefined || Biller_Postal_Address === null || Biller_Postal_Address === "") return res.json({ status: false, msg: 'Please provide the Biller_Postal_Address.' });

    if (Biller_Contact_Person === undefined || Biller_Contact_Person === null || Biller_Contact_Person === "") return res.json({ status: false, msg: 'Please provide the Biller_Contact_Person.' });

    if (Biller_Contact_Number === undefined || Biller_Contact_Number === null || Biller_Contact_Number === "") return res.json({ status: false, msg: 'Please provide the Biller_Contact_Number.' });

    let user = await BordBiller.findOne({ Biller_Contact_Number: Biller_Contact_Number});//Finding the specific User

    if(user){
     return res.json({ status: false, msg: 'Biller contact number already exists .' });

    }
if (Biller_Contact_Email === undefined || Biller_Contact_Email === null || Biller_Contact_Email === "") return res.json({ status: false, msg: 'Please provide the Biller_Contact_Email.' });



    // let user1 = await BordBiller.find({}).sort({_id:-1}).limit(1);
           
    // if(user1.length>0){
      
    // var test1=user1[0].Biller_OID

    // var test2=test1++
    // }
    // else{
    //   var test1=1
    // }

    let user1 = await BordBiller.find({}).sort({_id:-1}).limit(1);
           
           if(user1.length>0){
           var text = user1[0].Biller_OID;
           var n =text;
         var test1 = n.replace(/(\d+)/, (match)=>("0".repeat(8)+(++match)).substr(-8));
           }
           else{
             var test1="BR00000001"
           }





 
 const bordBiller = new BordBiller({
     Biller_OID:test1,
     Biller_Name:Biller_Name,
     Biller_Entity_Legal_Name:Biller_Entity_Legal_Name,
     Biller_ABN_ACN:Biller_ABN_ACN,
     Biller_Business_Address:Biller_Business_Address,
     Biller_Postal_Address:Biller_Postal_Address,
     Biller_Contact_Person:Biller_Contact_Person,
     Biller_Contact_Number:Biller_Contact_Number,
     Biller_Contact_Email:Biller_Contact_Email,
     BBC:data.BBC,
     image:data1,
     createdAt: timestamp
 
 })
 
 
 bordBiller.save((err) => {
     if (err) {
                   console.log(err);
                   const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
                   return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
                 }
                 else {
                    var msg="Biller Add Successfully"
                   return res.status(200).send({ status: true,msg: msg, data: bordBiller })
                 }
             })
     }
     catch(err){
         return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
     }
 
     
 }

 //-

 async function  get_biller_list(req,res,next) {
  try{
  BordBiller.find({}).sort({_id:-1}).exec(function(err,docs) {
    return res.send({ status: true, msg: 'Biller List .', data: arraySort(docs,  ['Biller_OID'], {reverse: false})})
  });
  }
  catch(err){
    return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
}
     
}

//--

async function  current_bills_list(req,res,next) {

  const currentbill = await NewBill.aggregate([
    {
        $lookup:{
            from : "users",
            localField: "user_OID", 
            foreignField : "User_OID", 
            as : "UserData"
        }
    },
    {
        $match:{
             //"User_OID":user.user_OID,
             Bill_Status: false
        }
    }

])

return  

 res.send({ status: true,msg: 'Current Bills List .', data: arraySort(currentbill, ['createdAt'], {reverse: true}) })
  // NewBill.find({ Bill_Status: false }, (err, data) => {
                         
  //         if (!err) {
  //           return res.send({ status: true,msg: 'Current Bills List .', data: data })
  //         }
  //         else {
  //           return res.send({ status: true,msg: 'Data not found' })
  //         }
  //       })
     
}

async function  settled_bills_list(req,res,next) {

  const currentbill = await NewBill.aggregate([
    {
        $lookup:{
            from : "users",
            localField: "user_OID", 
            foreignField : "User_OID", 
            as : "UserData"
        }
    },
    {
        $match:{
             //"User_OID":user.user_OID,
             Bill_Status:true
        }
    }

])

return res.send({ status: true,msg: 'Settled Bills List .', data: currentbill})
  // NewBill.find({ Bill_Status: true }, (err, data) => {
                         
  //         if (!err) {
  //           return res.send({ status: true,msg: 'Settled Bills List .', data: data })
  //         }
  //         else {
  //           return res.send({ status: true,msg: 'Data not found' })
  //         }
  //       })
     
}


async function billerUpdate(req,res,next) {
  try{
    let{Biller_OID} =req.params
       const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       console.log(req.files.image)
       const data = req.body;
       data.image = uploadFile[0].imageName;
       var data1 = data.image

       const {Biller_Name,Biller_Entity_Legal_Name,Biller_ABN_ACN,Biller_Business_Address,Biller_Postal_Address,Biller_Contact_Person,Biller_Contact_Number,Biller_Contact_Email}=req.body;

 let user = await BordBiller.findOne({ Biller_OID: Biller_OID});//Finding the specific User

 if(!user){
  return res.json({ status: false, msg: 'Biller Not exists .' });

 }

 if (Biller_Name === undefined || Biller_Name === null ||Biller_Name === ""){
  var Biller_Name1=user.Biller_Name;
  }
 else{
  var Biller_Name1=Biller_Name;
  }

  if (Biller_Entity_Legal_Name === undefined || Biller_Entity_Legal_Name === null ||Biller_Entity_Legal_Name === ""){
    var Biller_Entity_Legal_Name1=user.Biller_Entity_Legal_Name;
    }
   else{
    var Biller_Entity_Legal_Name1=Biller_Entity_Legal_Name;
    }


    if (Biller_ABN_ACN === undefined || Biller_ABN_ACN === null ||Biller_ABN_ACN === ""){
      var Biller_ABN_ACN1=user.Biller_ABN_ACN;
      }
     else{
      var Biller_ABN_ACN1=Biller_ABN_ACN;
      }

      if (Biller_Business_Address === undefined || Biller_Business_Address === null ||Biller_Business_Address === ""){
        var Biller_Business_Address1=user.Biller_Business_Address;
        }
       else{
        var Biller_Business_Address1=Biller_Business_Address;
        }
        if (Biller_Postal_Address === undefined || Biller_Postal_Address === null ||Biller_Postal_Address === ""){
          var Biller_Postal_Address1=user.Biller_Postal_Address;
          }
         else{
          var Biller_Postal_Address1=Biller_Postal_Address;
          }

          if (Biller_Contact_Person === undefined || Biller_Contact_Person === null ||Biller_Contact_Person === ""){
            var Biller_Contact_Person1=user.Biller_Contact_Person;
            }
           else{
            var Biller_Contact_Person1=Biller_Contact_Person;
            }
            
          if (Biller_Contact_Number === undefined || Biller_Contact_Number === null ||Biller_Contact_Number === ""){
            var Biller_Contact_Number1=user.Biller_Contact_Number;
            }
           else{
            var Biller_Contact_Number1=Biller_Contact_Number;
            }
            if (Biller_Contact_Email === undefined || Biller_Contact_Email === null ||Biller_Contact_Email === ""){
              var Biller_Contact_Email1=user.Biller_Contact_Email;
              }
             else{
              var Biller_Contact_Email1=Biller_Contact_Email;
              }

              if (req.body.image == undefined) {
                var image1 = user.image;
              }
        
              else if (data1 == "public/images/default/main.png") {
                var image1 = user.image
              }
              else {
        
                var image1 =  data1;
              }
  
  

              BordBiller.updateMany({Biller_OID: Biller_OID}, {
                Biller_Name:Biller_Name1,
                Biller_Entity_Legal_Name:Biller_Entity_Legal_Name1,
                Biller_ABN_ACN:Biller_ABN_ACN1,
                Biller_Business_Address:Biller_Business_Address1,
                Biller_Postal_Address:Biller_Postal_Address1,
                Biller_Contact_Person:Biller_Contact_Person1,
                Biller_Contact_Number:Biller_Contact_Number1,
                Biller_Contact_Email:Biller_Contact_Email1,
                BBC: data.BBC,
                notes: data.notes,
                image:image1,
                updatedAt:timestamp
               }, function(err, affected, resp) {
               //console.log(resp);
             })



             BordBiller.findOne({Biller_OID: Biller_OID}, (err, data) => {
                         
              if (!err) {
                return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
              }
              else {
                return res.send({ status: true,msg: 'Data not found' })
              }
            })




  }
  catch(err){
      return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
  }

  
}

async function  remove_biller(req,res,next) {
  try{
       let{ Biller_OID} =req.params
       BordBiller.deleteOne({Biller_OID: Biller_OID} ,function(err, affected, resp) {
   
})

return res.send({status: true , msg: 'Biller Delete Successfully.' })


  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

async function view_biller(req,res,next) {
  try{
    let{ Biller_OID} =req.params
    BordBiller.findOne({ Biller_OID:Biller_OID }, (err, data) => {
                         
      if (!err) {
        return res.send({ status: true,msg: 'Biller Details .', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })

  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}


// async function view_bills(req,res,next) {
//   try{
//     let{ Bill_OID} =req.params

//  const currentbill1 = await NewBill.aggregate([
//       {
//         $match:{
//              "Bill_OID":Bill_OID,
            
//         }
//     },
//       {
//           $lookup:{ 
//               from : "users",
           
//               localField: "user_OID", 
//               foreignField : "User_OID", 
//               as : "UserData"
//           },

//       },
     
     
// ])
  
//   return res.send({ status: true,msg: 'Bills Details .', data: currentbill1})

//   }
//   catch (err) {
//     return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
//   }
  
// }

async function view_bills(req,res,next) {
 
  var dict = {};
  try{
    let{ Bill_OID} =req.params
    NewBill.findOne({ "Bill_OID":Bill_OID }, async (err, data) => {                      
 
      Customer.findOne({ user_OID: data.User_OID }, async (err, userinfo) => {

        var bordBillerDetails = await   BordBiller.findOne({ Biller_OID: data.Biller_OID});
 
        dict = {
            "_id": data._id,
            "Bill_Status": data.Bill_Status,
            "Bill_OID": data.Bill_OID,
            "User_OID": data.User_OID,
            "UserData": userinfo,
            "Biller_OID": data.Biller_OID,
            "bordBillerDetails" : bordBillerDetails,
            "Bills_Name": data.Bills_Name,
            "Biller_Bill_ID": data.Biller_Bill_ID,
            "Bill_Amount": data.Bill_Amount,
            "Bill_Due_Date": data.Bill_Due_Date,
            "Bill_Issue_Date": data.Bill_Issue_Date,
            "Direct_Debit_Date": data.Direct_Debit_Date,
            "Direct_Debit_Amount": data.Direct_Debit_Amount,
            "Bpay_Biller_ID": data.Bpay_Biller_ID,
            "Bpay_Biller_CRN": data.Bpay_Biller_CRN,
            "Image": data.Image,
            "createdAt": data.createdAt,
            "Notes": data.Notes,
        };
 
        return res.send({ status: true,msg: 'Bill Details .', data: dict })
      });
  
 
    
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }








async function remove_bills(req,res,next) {
  try{
    let{ Bill_OID} =req.params
    NewBill.deleteOne({Bill_OID: Bill_OID} ,function(err, affected, resp) {
   
    })
    
    return res.send({status: true , msg: 'Bills Delete Successfully.' })
    

  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

//--

async function notificationdata(req,res,next) {
  try{

    Notificationlist.find( (err, data) => {
                         
      if (!err) {
        return res.send({ status: true,msg: 'Notification  List .', data: data })
      }
      else {
        data1=[]
        return res.send({ status: true,msg: 'Data not found', data:data1})
      }
    })

  

     

  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}


//

async function someuserlist(req,res,next) {
  try{
  
   
    Customer.find({}).sort({_id:-1}).limit(5).exec(function(err,docs) {
      return res.send({ status: true,msg: 'All User List.', data: docs})
    });
   

   
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

//Con

async function terms_condition(req,res,next) {
  try{
       const { title,condition } = req.body;

       let termsConditionlist = await termsCondition.findOne({ id: 1});//Finding the specific Data
   

       if (title === undefined || title === null ||title === ""){
            var title1=termsConditionlist.title;
            }
           else{
            var title1=title;
            }

            if (condition === undefined || condition === null ||condition === ""){
                 var condition1=termsConditionlist.condition;
                 }
                else{
                 var condition1=condition;
                 }
                

                 const timestamp = Date.now();
                 termsCondition.updateMany({id: 1}, {
                      title:title1,
                      condition:condition1,
                      updatedAt: timestamp,
                      
                    
       
                     }, function(err, affected, resp) {
                     //console.log(resp);
                   })

                   termsCondition.findOne({ id: 1 }, (err, data) => {
                      
                      if (!err) {
                        return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                      }
                      else {
                        return res.send({ status: true,msg: 'Data not found' })
                      }
                    })
       


  }
  catch (err) {
       return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
     }
  
}

async function  get_terms_condition(req,res,next) {

  try{
  termsCondition.findOne({ id: 1 }, (err, data) => {
                      
       if (!err) {
         return res.send({ status: true,msg: 'Terms Condition .', data: data })
       }
       else {
         return res.send({ status: true,msg: 'Data not found' })
       }
     })
    }

    catch (err) {
      return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
    }
  
}


//-----------------------------------------------------------------------------------

async function add_newbills(req,res,next) {

  console.log("add_newbills");

  try{


   
    
    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
    console.log(req.files.image)
    const data = req.body;
    data.image = uploadFile[0].imageName;
    var dataimage = data.image
    let { User_OID,Biller_OID,Bills_Name,Biller_Bill_ID,Bill_Amount,Bill_Due_Date, Bill_Issue_Date, Direct_Debit_Date,Direct_Debit_Amount,Bpay_Biller_ID,Bpay_Biller_CRN,Notes } = req.body;

    if ( User_OID=== undefined || User_OID === null || User_OID === "") return res.json({ status: false, msg: 'Please provide the User_OID.' });
    if ( Biller_OID=== undefined || Biller_OID === null || Biller_OID === "") return res.json({ status: false, msg: 'Please provide the Biller_OID.' });
    // if ( Biller_Bill_ID=== undefined || Biller_Bill_ID === null || Biller_Bill_ID === "") return res.json({ status: false, msg: 'Please provide the Biller_Bill_ID.' });
    // if ( Bills_Name=== undefined || Bills_Name === null || Bills_Name === "") return res.json({ status: false, msg: 'Please provide the Bills Name.' });
    if ( Bill_Amount=== undefined || Bill_Amount === null || Bill_Amount === "") return res.json({ status: false, msg: 'Please provide the Bill_Amount.' });
    if ( Bill_Due_Date=== undefined || Bill_Due_Date === null || Bill_Due_Date === "") return res.json({ status: false, msg: 'Please provide the Bill_Due_Date.' });
    if ( Bill_Issue_Date=== undefined || Bill_Issue_Date === null || Bill_Issue_Date === "") return res.json({ status: false, msg: 'Please provide the Bill_Issue_Date.' });
    // if ( Bpay_Biller_ID=== undefined || Bpay_Biller_ID === null || Bpay_Biller_ID === "") return res.json({ status: false, msg: 'Please provide the Bpay_Biller_ID.' });
    // if ( Bpay_Biller_CRN=== undefined || Bpay_Biller_CRN === null || Bpay_Biller_CRN === "") return res.json({ status: false, msg: 'Please provide the Bpay_Biller_ID.' });

    
    let user1 = await NewBill.find({}).sort({_id:-1}).limit(1);
           
    if(user1.length>0){
    var text = user1[0].Bill_OID;
    var n =text;
  var data1 = n.replace(/(\d+)/, (match)=>("0".repeat(8)+(++match)).substr(-8));
    }
    else{
      var data1="BL00000001"
    }

    console.log("gdxhssxfjgggfxfng")
  const newBill = new NewBill({
				Bill_OID:data1,
				User_OID:User_OID,
				Biller_OID:Biller_OID,
				Bills_Name:Bills_Name,
				Biller_Bill_ID:Biller_Bill_ID,
				Bill_Amount: Bill_Amount,
				Bill_Due_Date:Bill_Due_Date,
				Bill_Issue_Date: Bill_Issue_Date,
				Direct_Debit_Date:Direct_Debit_Date,
				Direct_Debit_Amount:Direct_Debit_Amount,
				Bpay_Biller_ID:Bpay_Biller_ID,
				Bpay_Biller_CRN:Bpay_Biller_CRN,
				Image:dataimage,
				Notes:Notes,
				createdAt: timestamp,

    })

   
    newBill.save((err) => {
      if (err) {
              console.log(err);
              const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
              return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
            }
            else {

              console.log("***********CHECK DATA********");
              console.log(User_OID);

              Customer.findOne({'user_OID':User_OID}, function(err, resp) {
                console.log("GET ALL DATA");
                console.log(resp.device_token);
              })
         
              return res.status(200).send({ status: true,msg: 'New Bills Add successfully.', data: newBill }) 
            }
        })
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}


async function get_newbill(req,res,next) {
  try{

    let{User_OID} =req.params
    NewBill.find({User_OID:User_OID}, (err, data) => {
                         
      if (!err) {
        return res.send({ status: true,msg: 'New Bills Details .', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

async function biller_count(req,res,next) {
  try{
  
       const estimate = await BordBiller.estimatedDocumentCount();
     
       data1={
            biller_count:estimate

       }

       return res.send({ status: true,msg: 'Biller Count.', data: data1 })


  }
  catch (err) {
       return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
     }
  
}

async function active_status(req,res,next) {
  try{ 
    let{user_OID} =req.params
    let {active_status} =req.body;

    if (active_status === undefined || active_status === null || active_status === "") return res.json({ status: false, msg: 'Please provide the status.'});

    Customer.updateOne({user_OID:user_OID}, { active_status:active_status}, function(err, affected, resp) {
   
    })

    if(active_status ==="1"){

      return res.send({ status: true,msg: 'User Active Now' })


    }
    else{
      return res.send({ status: true,msg: 'User Block Now' })

    }

  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

//---

async function updatebills(req,res,next) {
  try{
    var ERRORS = ['', null, undefined];
    let{Bill_OID} = req.params;
     const data = req.body;
    // if(errors.indexOf(myFile)==-1){


    // }
	const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
	console.log(req.files.image)
	data.image = uploadFile[0].imageName;
  var newPic =  uploadFile[0].imageName;
	var dataimage = data.image

  console.log('dataimage dataimagedataimagedataimagedataimagedataimage', dataimage);

  

    let { User_OID,Biller_OID,Bills_Name,Biller_Bill_ID,Bill_Amount,Bill_Due_Date, Bill_Issue_Date, Direct_Debit_Date,Direct_Debit_Amount,Bpay_Biller_ID,Bpay_Biller_CRN,Notes  } = req.body;
        console.log(' Bill_AmountBill_AmountBill_AmountBill_Amount', Bill_Amount);


    let billsdata = await NewBill.findOne({ Bill_OID:Bill_OID}); //Finding the specific Data
    

    if (User_OID === undefined || User_OID === null ||User_OID === ""){
      var User_OID1=billsdata.User_OID;
      }
     else{
      var User_OID1=User_OID;
      }
if (Biller_OID === undefined || Biller_OID === null ||Biller_OID === ""){
          var Biller_OID1=billsdata.Biller_OID;
          }
         else{
          var Biller_OID1=Biller_OID;
          }


          if (Bills_Name === undefined || Bills_Name === null ||Bills_Name === ""){
            var Biller_Name1=billsdata.Bills_Name;
            }
           else{
            var Biller_Name1=Bills_Name;
            }

            
   
            
          if (Biller_Bill_ID === undefined || Biller_Bill_ID === null ||Biller_Bill_ID === ""){
            var Biller_Bill_ID1=billsdata.Biller_Bill_ID;
            }
           else{
            var Biller_Bill_ID1=Biller_Bill_ID;
            }

              
          if (Bill_Amount === undefined || Bill_Amount === null ||Bill_Amount === ""){
            var Bill_Amount1=billsdata.Bill_Amount;
            }
           else{
            var Bill_Amount1=Bill_Amount;
            }

            if (Bill_Due_Date === undefined || Bill_Due_Date === null ||Bill_Due_Date === ""){
              var Bill_Due_Date1=billsdata.Bill_Due_Date;
              }
             else{
              var Bill_Due_Date1=Bill_Due_Date;
              }


              // if (Direct_Debit_Date === undefined || Direct_Debit_Date === null ||Direct_Debit_Date === ""){
              //   var Direct_Debit_Date1=billsdata.Direct_Debit_Date;
              //   }
              //  else{
              //   var Direct_Debit_Date1=Direct_Debit_Date;
              //   }

                 var Direct_Debit_Date1=Direct_Debit_Date;

                if (Direct_Debit_Amount === undefined || Direct_Debit_Amount === null ||Direct_Debit_Amount === ""){
                  var Direct_Debit_Amount1 = billsdata.Direct_Debit_Amount;
                  }
                 else{
                  var Direct_Debit_Amount1=Direct_Debit_Amount;
                  }

                 

                  if (Bpay_Biller_ID === undefined || Bpay_Biller_ID === null ||Bpay_Biller_ID === ""){
                    var Bpay_Biller_ID1=billsdata.Bpay_Biller_ID;
                    }
                   else{
                    var Bpay_Biller_ID1=Bpay_Biller_ID;
                    }

                    if (Bpay_Biller_CRN === undefined || Bpay_Biller_CRN === null ||Bpay_Biller_CRN === ""){
                      var Bpay_Biller_CRN1=billsdata.Bpay_Biller_CRN;
                      }
                     else{
                      var Bpay_Biller_CRN1=Bpay_Biller_CRN;
                      }

                      if (Notes === undefined || Notes === null || Notes=== ""){
                        var Notes1=billsdata.Notes;
                        }
                       else{
                        var Notes1=Notes;
                        }

   

                        var newData = {
          								Bill_Amount:req.body.Bill_Amount,
          								Bill_Due_Date:Bill_Due_Date1,
          								Bill_Issue_Date:req.body.Bill_Issue_Date,
          								Biller_OID:Biller_OID1,
          								Direct_Debit_Date:Direct_Debit_Date1,
          								Direct_Debit_Amount:Direct_Debit_Amount1,
          								User_OID:User_OID1
                         }

                         console.log(newData);

                     if (ERRORS.indexOf(newPic)>=0) {
                           console.log('1');
                        }
                        else {
                            newData['Image'] = dataimage
                     
                           console.log('3');
                        }


                      NewBill.updateMany({Bill_OID:Bill_OID}, newData , function(err, affected, resp) {
                       //console.log(resp);
                     })

                     NewBill.findOne({Bill_OID:Bill_OID}, (err, data) => {
                         
                      if (!err) {
                        return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
                      }
                      else {
                        return res.send({ status: true,msg: 'Data not found' })
                      }
                    })


  }
  catch (err) {
  	console.log(err);
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}


//----------------

async function  data_biller_list(req,res,next) {
 
try{
  BordBiller.find( (err, data) => {
                      
    if (!err) {
      return res.send({ status: true,msg: 'Biller List .', data: data })
    }
    else {
      return res.send({ status: true,msg: 'Data not found' })
    }
  })




  }
  catch(err){
    return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
}
     
}

//---------------------------------------------

async function bills_details(req,res,next) {
  try{

    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

  let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })

  // NewBill.find({User_OID: user.user_OID}, (err, data) => {
                      
  //   if (!err) {
  //     return res.send({ status: true,msg: 'Bills Details .', data: data })
  //   }
  //   else {
  //     return res.send({ status: true,msg: 'Data not found' })
  //   }
  // })

  const currentbill1 = await NewBill.aggregate([
    {
        $lookup:{
          from : "onbordbillers",
          localField: "Biller_OID", 
          foreignField : "Biller_OID",
            as : "BillerData"
        }
    },
    {
        $match:{
             "User_OID":user.user_OID,
             //Bill_Status:true
        }
    }

])

return res.send({ status: true,msg: 'Bills Details .', data: currentbill1})





 

  }
  catch(err){
    return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
}
  
}

//--------------Mark as Paid-

async function markaspaid(req,res,next) {
  try{
    
    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })
   




    const uploadFile = await filesUpload2(req, res, [{ name: 'Bills_File' }], config.userFilePath);
    console.log(req.files.Bills_File)
    const data = req.body;
    data.image = uploadFile[0].imageName;
    var dataimage = data.image
    console.log(dataimage)


  }
  catch(err){
    return res.status(401).send({ status: false,msg: 'Something Went Wrong.Please Try Again!'})
}
  
}


//----------------------ma'am esma changes kar lo


async function view_bills_list(req,res,next) {
 
  var counter = 0, billsdata = [], dict = {};
  try{
   
    NewBill.find({Bill_Status: false}, (err, data) => {                      
      
      getBillsdata();
      function getBillsdata(){

        if(data.length>0){
        
        Customer.findOne({ user_OID: data[counter].User_OID }, (err, userinfo) => {

           BordBiller.findOne({  Biller_OID: data[counter]. Biller_OID }, (err, userinfo1) => {

            dict = {
            "_id": data[counter]._id,
            "Bill_Status": data[counter].Bill_Status,
            "Bill_OID": data[counter].Bill_OID,
            "User_OID": data[counter].User_OID,
            "Biller_OID": data[counter].Biller_OID,
            "Bills_Name": userinfo1.Biller_Name,
            "Biller_Bill_ID": data[counter].Biller_Bill_ID,
            "Bill_Amount": data[counter].Bill_Amount,
            "Bill_Due_Date": data[counter].Bill_Due_Date,
            "Bill_Issue_Date": data[counter].Bill_Issue_Date,
            "Direct_Debit_Date": data[counter].Direct_Debit_Date,
            "Direct_Debit_Amount": data[counter].Direct_Debit_Amount,
            "Bpay_Biller_ID": data[counter].Bpay_Biller_ID,
            "Bpay_Biller_CRN": userinfo1.BBC,
            "Image": data[counter].Image,
            "createdAt": data[counter].createdAt,
            "Notes": data[counter].Notes,
            "UserData": userinfo,
            "user_OID": userinfo.user_OID

          };
          billsdata.push(dict);
          if(counter < data.length -1){
            counter = counter + 1;
            getBillsdata();
          }else{
            return res.send({ status: true,msg: 'Bill Details .', data:  arraySort(billsdata,  ['Bill_OID'], {reverse: true})})
          }
            




           });
 

          
        });//
      }
      else{
        return res.send({ status: true,msg: 'Bill Details .', data:[] })

      }


      };
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }



 async function settel_bills_list(req,res,next) {
 
  var counter = 0, billsdata = [], dict = {};
  try{
   
    NewBill.find({Bill_Status:true}, (err, data) => {                      
      
      getBillsdata();
      function getBillsdata(){
        

        if(data.length>0){
        
        Customer.findOne({ user_OID: data[counter].User_OID }, (err, userinfo) => {
 
          dict = {
            "_id": data[counter]._id,
            "Bill_Status": data[counter].Bill_Status,
            "Bill_OID": data[counter].Bill_OID,
            "User_OID": data[counter].User_OID,
            "Biller_OID": data[counter].Biller_OID,
            "Bills_Name": data[counter].Bills_Name,
            "Biller_Bill_ID": data[counter].Biller_Bill_ID,
            "Bill_Amount": data[counter].Bill_Amount,
            "Bill_Due_Date": data[counter].Bill_Due_Date,
            "Direct_Debit_Date": data[counter].Direct_Debit_Date,
            "Direct_Debit_Amount": data[counter].Direct_Debit_Amount,
            "Bpay_Biller_ID": data[counter].Bpay_Biller_ID,
            "Bpay_Biller_CRN": data[counter].Bpay_Biller_CRN,
            "Image": data[counter].Image,
            "createdAt": data[counter].createdAt,
            "Notes": data[counter].Notes,
            "UserData": userinfo
          };
          billsdata.push(dict);
          if(counter < data.length -1){
            counter = counter + 1;
            getBillsdata();
          }else{
            return res.send({ status: true,msg: 'Settled Bills List .', data: billsdata })
          }
          
        });
      }
      else{
        return res.send({ status: true,msg: 'Settled Bills List .', data:[] })

      }
      };
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }


 //----------------------App end

 async function app_current_bills_list(req,res,next) {
 
  var counter = 0, billsdata = [], dict = {};
  try{

    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })
   
    NewBill.find({User_OID:user.user_OID,Bill_Status:false}, (err, data) => {                      
      
      getBillsdata();
      function getBillsdata(){
        

        if(data.length>0){
        
          BordBiller.findOne({  Biller_OID: data[counter]. Biller_OID }, (err, userinfo) => {
 
          dict = { 
            "_id": data[counter]._id,
            "Bill_Status": data[counter].Bill_Status,
            "Bill_OID": data[counter].Bill_OID,
            "User_OID": data[counter].User_OID,
            "Biller_OID": data[counter].Biller_OID,
            "Bills_Name":  userinfo.Biller_Name,
            "Biller_Bill_ID": data[counter].Biller_Bill_ID,
            "Bill_Amount": data[counter].Bill_Amount,
            "Bill_Due_Date": data[counter].Bill_Due_Date,
            "Bill_Issue_Date": data[counter].Bill_Issue_Date,
            "Direct_Debit_Date": data[counter].Direct_Debit_Date,
            "Direct_Debit_Amount": data[counter].Direct_Debit_Amount,
            "Bpay_Biller_ID": data[counter].Bpay_Biller_ID,
            "Bpay_Biller_CRN": userinfo.BBC,
            "Image": data[counter].Image,
            "createdAt": data[counter].createdAt,
            "Notes": data[counter].Notes,
            "BillerData": userinfo,

          };
          billsdata.push(dict);
          if(counter < data.length -1){
            counter = counter + 1;
            getBillsdata();
          }else{
            return res.send({ status: true,msg: 'Current Bills List .', data: billsdata })
          }
          
        });
      }
      else{
        return res.send({ status: true,msg: 'Current Bills List .', data:[] })

      }
      };
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }


 async function app_seleld_bills_list(req,res,next) {
 
  var counter = 0, billsdata = [], dict = {};
  try{

    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })
   
    NewBill.find({User_OID:user.user_OID,Bill_Status:true}, (err, data) => {                      
      
      getBillsdata();
      function getBillsdata(){
        

        if(data.length>0){
        
          BordBiller.findOne({  Biller_OID: data[counter]. Biller_OID }, (err, userinfo) => {
 
          dict = { 
            "_id": data[counter]._id,
            "Bill_Status": data[counter].Bill_Status,
            "Bill_OID": data[counter].Bill_OID,
            "User_OID": data[counter].User_OID,
            "Biller_OID": data[counter].Biller_OID,
            "Bills_Name": data[counter].Bills_Name,
            "Biller_Bill_ID": data[counter].Biller_Bill_ID,
            "Bill_Amount": data[counter].Bill_Amount,
            "Bill_Due_Date": data[counter].Bill_Due_Date,
            "Direct_Debit_Date": data[counter].Direct_Debit_Date,
            "Direct_Debit_Amount": data[counter].Direct_Debit_Amount,
            "Bpay_Biller_ID": data[counter].Bpay_Biller_ID,
            "Bpay_Biller_CRN": data[counter].Bpay_Biller_CRN,
            "Image": data[counter].Image,
            "createdAt": data[counter].createdAt,
            "Notes": data[counter].Notes,
            "BillerData": userinfo
          };
          billsdata.push(dict);
          if(counter < data.length -1){
            counter = counter + 1;
            getBillsdata();
          }else{
            return res.send({ status: true,msg: 'Current Bills List .', data: billsdata })
          }
          
        });
      }
      else{
        return res.send({ status: true,msg: 'Current Bills List .', data:[] })

      }
      };
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }


//---App end view Bills

async function app_view_bills(req,res,next) {
 
  var dict = {};
  try{
    let{ Bill_OID} =req.params
    NewBill.findOne({ "Bill_OID":Bill_OID }, (err, data) => {                      
 
      BordBiller.findOne({ Biller_OID: data.Biller_OID }, (err, userinfo) => {
 
        dict = {
          "_id": data._id,
          "Bill_Status": data.Bill_Status,
          "Bill_OID": data.Bill_OID,
          "User_OID": data.User_OID,
          "Biller_OID": data.Biller_OID,
          "Bills_Name": data.Bills_Name,
          "Biller_Bill_ID": data.Biller_Bill_ID,
          "Bill_Amount": data.Bill_Amount,
          "Bill_Due_Date": data.Bill_Due_Date,
          "Direct_Debit_Date": data.Direct_Debit_Date,
          "Direct_Debit_Amount": data.Direct_Debit_Amount,
          "Bpay_Biller_ID": data.Bpay_Biller_ID,
          "Bpay_Biller_CRN": data.Bpay_Biller_CRN,
          "Image": data.Image,
          "createdAt": data.createdAt,
          "Notes": data.Notes,
          "BillsData": userinfo
        };
 
        return res.send({ status: true,msg: 'Bill Details .', data: dict })
      });
  
 
    
    })
 
  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
 }


 async function  sendmail1(email1, auth_key) {

            var nodemailer = require('nodemailer')
            var smtpTransport = require('nodemailer-smtp-transport');
            const jwt = require('jsonwebtoken');
            const config =require("config");
            var emailDetails = require('../../config/sms');
            const Customer = require("../../models/customer");
            const jwtToken='OPAY';
            const { email, password } = emailDetails
            var mailAccountUser = email
            var mailAccountPassword = password
            var fromEmailAddress = email
            var transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: mailAccountUser,
                pass: mailAccountPassword
            }
            }))
          

            let displayMessageHTML;

            const credentials = {

            email:email1,
            time: (new Date()).getTime()
            };

            const token = jwt.sign(credentials, jwtToken, { algorithm: 'HS256' });

            customer = Customer
            customer.updateOne({auth_key: auth_key}, { verificationLink:token}, function(err, affected, resp) {
            console.log(resp);
            }),
            displayMessageHTML =` 
            <p>Hi <br>Please click the following button to verify your email address:</p>

            <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="border-radius: 3px;" bgcolor="#0000FF"><a href="${config.baseUrl1}:${config.port}/api/v1/Opay/mailverification/${token}" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 24px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Verify email</a></td>
            </tr>
            </table>
            <br>
            If the link doesn't work, just copy and paste the following URL into a web browser:<br>
            <a href="${config.baseUrl1}:${config.port}/api/v1/Opay/mailverification/${token}">${config.baseUrl1}:${config.port}/api/v1/Opay/mailverification/${token}</a><br>
            <br>
            All good things<br>
           `
             
            let email11 = {
                from: fromEmailAddress,
                to: email1,
                subject: "Verify your email",
                text: "Doshy",
                html: displayMessageHTML
            }
            try {
            transport.sendMail(email11, function (error, response) {
                    if (error) {
                        console.log('The Error during mail sending', error)
                        return false;
                    } else {
                        console.log('The Response during mail sending', response.response)
                        console.log('The Response during mail sending', response)
                        return true;
                    }
                });
            }
            catch (err) {
                console.log('err is err', err)
                return false;
            }
           
 
   
 }









