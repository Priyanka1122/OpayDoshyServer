const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const model = require("../../models/index");
const { required } = require("joi");

const Customer = require("../../models/customer");
const NewBill = require("../../models/newBill");
const BordBiller = require("../../models/onbordBiller");
const substringFunction = require("../../logic/substringHandling");

var token_decode = require("../../logic/token_decode");

//-----------------------
//------------------
exports.newbill = newbilldata;
exports.billerdata = billerdata;
exports.getbiller = getbiller;
exports.mybills_current = mybills_current;
exports.mybills_settled = mybills_settled;

async function newbilldata(req, res, next) {
	try {
		const { security_key, auth_key } = req.headers;

		const { _id } = token_decode(auth_key);

		const {
			Bill_OID,
			User_Mobile,
			Biller_OID,
			Biller_Name,
			Biller_Bill_ID,
			Bill_Amount,
			Bill_Due_Date,
			Direct_Debit_Date,
			Direct_Debit_Amount,
			Link_Attachment,
			Bpay_Biller_ID,
			Bpay_Biller_CRN
		} = req.body;
		if (security_key === undefined || security_key === null || security_key === "")
			return res.json({ status: false, msg: "Please provide the security key." });
		if (security_key != "OPAY@123") {
			message = "Invalid security key";
			res.status(403).json({ success: false, code: 403, msg: message });
			res.end();
			return false;
		}
		if (auth_key === undefined || auth_key === null || auth_key === "")
			return res.json({ status: false, msg: "Please provide the auth key." });
		let user = await Customer.findOne({ auth_key: auth_key }); //Finding the specific User
		if (user === null || user === undefined || !user)
			return res.json({ status: false, msg: `User doesn't exist.` });

		if (Bill_OID === undefined || Bill_OID === null || Bill_OID === "")
			return res.json({ status: false, msg: "Please provide the bill oid." });

		if (User_Mobile === undefined || User_Mobile === null || User_Mobile === "")
			return res.json({ status: false, msg: "Please provide the user mobile." });

		//if (Biller_OID === undefined || Biller_OID === null || Biller_OID === "") return res.json({ status: false, msg: 'Please provide the user biller oid.' });

		if (Biller_Name === undefined || Biller_Name === null || Biller_Name === "")
			return res.json({ status: false, msg: "Please provide the user biller name." });

		if (Biller_Bill_ID === undefined || Biller_Bill_ID === null || Biller_Bill_ID === "")
			return res.json({ status: false, msg: "Please provide the user biller bill id." });

		if (Bill_Amount === undefined || Bill_Amount === null || Bill_Amount === "")
			return res.json({ status: false, msg: "Please provide the user bill amount." });

		if (Bill_Due_Date === undefined || Bill_Due_Date === null || Bill_Due_Date === "")
			return res.json({ status: false, msg: "Please provide the user bill due date." });

		if (Direct_Debit_Date === undefined || Direct_Debit_Date === null || Direct_Debit_Date === "")
			return res.json({ status: false, msg: "Please provide the direct debit date." });

		if (Direct_Debit_Date === undefined || Direct_Debit_Date === null || Direct_Debit_Date === "")
			return res.json({ status: false, msg: "Please provide the direct debit date." });

		const newBill = new NewBill({
			User_OID: _id,
			Bill_OID: Bill_OID,
			User_Mobile: User_Mobile,
			Biller_OID: Biller_OID,
			Biller_Name: Biller_Name,
			Biller_Bill_ID: Biller_Bill_ID,
			Bill_Amount: Bill_Amount,
			Bill_Due_Date: Bill_Due_Date,
			Direct_Debit_Date: Direct_Debit_Date,
			Direct_Debit_Amount: Direct_Debit_Amount,
			Link_Attachment: Link_Attachment,
			Bpay_Biller_ID: Bpay_Biller_ID,
			Bpay_Biller_CRN: Bpay_Biller_CRN
		});
		newBill.save((err) => {
			if (err) {
				console.log(err);
				const ErrorMessage = substringFunction(err.toString(), "#", "b");
				return res.status(500).send({ status: false, msg: `${ErrorMessage}` });
			} else {
				var msg = "New Bill Add Successfully";
				return res.status(200).send({ status: true, msg: msg, data: newBill });
			}
		});
	} catch (err) {
		return res.status(401).send({ status: false, msg: "Something Went Wrong.Please Try Again!" });
	}
}

async function billerdata(req, res, next) {
	try {
		const { security_key, auth_key } = req.headers;

		const { _id } = token_decode(auth_key);

		const {
			Biller_OID,
			Biller_Name,
			Biller_Entity_Legal_Name,
			Biller_ABN_ACN,
			Biller_Business_Address,
			Biller_Postal_Address,
			Biller_Contact_Person,
			Biller_Contact_Number,
			Biller_Contact_Email,
			Biller_Logo
		} = req.body;

		if (security_key === undefined || security_key === null || security_key === "")
			return res.json({ status: false, msg: "Please provide the security key." });
		if (security_key != "OPAY@123") {
			message = "Invalid security key";
			res.status(403).json({ success: false, code: 403, msg: message });
			res.end();
			return false;
		}
		if (auth_key === undefined || auth_key === null || auth_key === "")
			return res.json({ status: false, msg: "Please provide the auth key." });
		let user = await Customer.findOne({ auth_key: auth_key }); //Finding the specific User
		if (user === null || user === undefined || !user)
			return res.json({ status: false, msg: `User doesn't exist.` });

		const bordBiller = new BordBiller({
			Biller_OID: Biller_OID,
			Biller_Name: Biller_Name,
			Biller_Entity_Legal_Name: Biller_Entity_Legal_Name,
			Biller_ABN_ACN: Biller_ABN_ACN,
			Biller_Business_Address: Biller_Business_Address,
			Biller_Postal_Address: Biller_Postal_Address,
			Biller_Contact_Person: Biller_Contact_Person,
			Biller_Contact_Number: Biller_Contact_Number,
			Biller_Contact_Email: Biller_Contact_Email,
			Biller_Logo: Biller_Logo
		});

		bordBiller.save((err) => {
			if (err) {
				console.log(err);
				const ErrorMessage = substringFunction(err.toString(), "#", "b");
				return res.status(500).send({ status: false, msg: `${ErrorMessage}` });
			} else {
				var msg = "Biller Add Successfully";
				return res.status(200).send({ status: true, msg: msg, data: bordBiller });
			}
		});
	} catch (err) {
		return res.status(401).send({ status: false, msg: "Something Went Wrong.Please Try Again!" });
	}
}

async function getbiller(req, res, next) {
	try {
		const { security_key } = req.headers;
		const { Biller_OID } = req.body;

		if (security_key === undefined || security_key === null || security_key === "")
			return res.json({ status: false, msg: "Please provide the security key." });
		if (security_key != "OPAY@123") {
			message = "Invalid security key";
			res.status(403).json({ success: false, code: 403, msg: message });
			res.end();
			return false;
		}

		BordBiller.findOne({ Biller_OID: Biller_OID }, (err, data) => {
			if (!err) {
				return res.send({ status: true, msg: "Biller Data.", data: data });
			} else {
				return res.send({ msg: "Data not found", status: true });
			}
		});
	} catch (err) {
		return res.status(401).send({ status: false, msg: "Something Went Wrong.Please Try Again!" });
	}
}

async function mybills_current(req, res, next) {
	try {
		const { security_key, auth_key } = req.headers;

		if (security_key === undefined || security_key === null || security_key === "")
			return res.json({ status: false, msg: "Please provide the security key." });
		if (security_key != "OPAY@123") {
			message = "Invalid security key";
			res.status(403).json({ success: false, code: 403, msg: message });
			res.end();
			return false;
		}
		if (auth_key === undefined || auth_key === null || auth_key === "")
			return res.json({ status: false, msg: "Please provide the auth key." });
		let user = await Customer.findOne({ auth_key: auth_key }); //Finding the specific User
		if (user === null || user === undefined || !user)
			return res.json({ status: false, msg: `User doesn't exist.` });
		console.log("USER IDDDDDDD");
		console.log(user.user_OID);
		const currentbill = await NewBill.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "user_OID",
					foreignField: "User_OID",
					as: "BordBillerdata"
				}
			},
			{
				$match: {
					User_OID: user.user_OID
					//"Bill_Status":true
				}
			}
		]);

		const BillerData = await NewBill.aggregate([
			{
				$lookup: {
					from: "onbordbillers",
					localField: "Biller_OID",
					foreignField: "Biller_OID",
					as: "BillerData"
				}
			},
			{
				$match: {
					User_OID: user.user_OID
					//"Bill_Status":true
				}
			}
		]);

		return res.send({ status: true, msg: "My Current Bills.", data: currentbill, billerData:  BillerData});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: false, msg: "Something Went Wrong." });
	}
}

async function mybills_settled(req, res, next) {
	try {
		const { security_key, auth_key } = req.headers;
		if (security_key === undefined || security_key === null || security_key === "")
			return res.json({ status: false, msg: "Please provide the security key." });
		if (security_key != "OPAY@123") {
			message = "Invalid security key";
			res.status(403).json({ success: false, code: 403, msg: message });
			res.end();
			return false;
		}
		if (auth_key === undefined || auth_key === null || auth_key === "")
			return res.json({ status: false, msg: "Please provide the auth key." });
		let user = await Customer.findOne({ auth_key: auth_key }); //Finding the specific User
		if (user === null || user === undefined || !user)
			return res.json({ status: false, msg: `User doesn't exist.` });

		console.log(user.mobile);

		// const currentbill = await NewBill.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: "onbordbillers",
		// 			localField: "Biller_OID",
		// 			foreignField: "Biller_OID",
		// 			as: "BordBillerdata"
		// 		}
		// 	},
		// 	{
		// 		$match: {
		// 			User_Mobile: user.mobile,
		// 			Bill_Status: true
		// 		}
		// 	}
		// ]);

		const currentbill = await NewBill.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "user_OID",
					foreignField: "User_OID",
					as: "BordBillerdata"
				}
			},
			{
				$match: {
					User_OID: user.user_OID,
					Bill_Status:true
				}
			}
		]);

		const BillerData = await NewBill.aggregate([
			{
				$lookup: {
					from: "onbordbillers",
					localField: "Biller_OID",
					foreignField: "Biller_OID",
					as: "BillerData"
				}
			},
			{
				$match: {
					User_OID: user.user_OID,
					Bill_Status:true
				}
			}
		]);

		return res.send({ status: true, msg: "My CURRENT Bills.", data: currentbill, billerData:  BillerData });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: false, msg: "Something Went Wrong." });
	}
}

//-----------------------------
