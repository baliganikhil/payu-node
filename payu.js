var request = require('request');
var crypto = require('crypto');

function PayU(merchant_id, salt, payu_url) {
	if (noe(payu_url)) {
		payu_url = 'https://test.payu.in/merchant/postservice.php?form=2';
	}

	function get_hash(command, var1) {
		var s = crypto.createHash('sha512');
		s.update([merchant_id, command, var1, salt].join('|'));
		return s.digest('hex');
	}

	function https_post(payload, cb) {
		request.post(payu_url, {form: payload}, function(err, data) {
			if (err) {
				cb(err);
			} else {
				cb(err, data.body);
			}
		});
	}

	function noe(i) {
		return [undefined, null, ''].indexOf(i) > -1;
	}

	this.verify_payment = function(txn_id, cb) {
		var cmd = "verify_payment";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": txn_id,
		  "hash": get_hash(cmd, txn_id)
		};

		https_post(payload, cb);
	};

	this.check_payment = function(mihpayid, cb) {
		var cmd = "check_payment";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.cancel_refund_transaction = function(mihpayid, token_id, refund_amt, cb) {
		var cmd = "cancel_refund_transaction";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": token_id,
		  "var3": refund_amt,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.check_action_status = function(request_id, cb) {
		var cmd = "check_action_status";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": request_id,
		  "hash": get_hash(cmd, request_id)
		};

		https_post(payload, cb);
	};

	this.capture_transaction = function(mihpayid, token_id, cb) {
		var cmd = "capture_transaction";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": token_id,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.update_requests = function(mihpayid, request_id, bank_ref_id, amt, action, status, cb) {
		var cmd = "update_requests";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": request_id,
		  "var3": bank_ref_id,
		  "var4": amt,
		  "var5": action,
		  "var6": status,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.cod_verify = function(mihpayid, token_id, amt, cb) {
		var cmd = "cod_verify";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": token_id,
		  "var3": amt,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.cod_cancel = function(mihpayid, token_id, amt, cb) {
		var cmd = "cod_cancel";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": token_id,
		  "var3": amt,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.cod_settled = function(mihpayid, token_id, amt, cb) {
		var cmd = "cod_settled";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "var2": token_id,
		  "var3": amt,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.get_TDR = function(mihpayid, cb) {
		var cmd = "get_TDR";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": mihpayid,
		  "hash": get_hash(cmd, mihpayid)
		};

		https_post(payload, cb);
	};

	this.udf_update = function(txn_id, udf1, udf2, udf3, udf4, udf5, cb) {
		var cmd = "udf_update";

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": txn_id,
		  "var2": udf1,
		  "var3": udf2,
		  "var4": udf3,
		  "var5": udf4,
		  "var6": udf5,
		  "hash": get_hash(cmd, txn_id)
		};

		https_post(payload, cb);
	};

	this.getNetbankingStatus = function(ibibo_code, cb) {
		var cmd = "getNetbankingStatus";

		if (noe(ibibo_code)) {
			ibibo_code = 'default';
		}

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": ibibo_code,
		  "hash": get_hash(cmd, ibibo_code)
		};

		https_post(payload, cb);

	};

	this.getIssuingBankStatus = function(bin, cb) {
		var cmd = "getIssuingBankStatus";

		// bin = Bank Identification Number = First 6 digits of card

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": bin,
		  "hash": get_hash(cmd, bin)
		};

		https_post(payload, cb);
	};

	this.get_Transaction_Details = function(start_date, end_date, cb) {
		var cmd = "get_Transaction_Details";

		/*
			Dates are in yyyy-mm-dd
		*/

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": start_date,
		  "var2": end_date,
		  "hash": get_hash(cmd, start_date)
		};

		https_post(payload, cb);
	};

	this.get_transaction_info = function(start_time, end_time, cb) {
		var cmd = "get_transaction_info";

		/*
			Times are in yyyy-mm-dd 16:15:00
		*/

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": start_time,
		  "var2": end_time,
		  "hash": get_hash(cmd, start_time)
		};

		https_post(payload, cb);
	};

	this.check_isDomestic = function(bin, cb) {
		var cmd = "check_isDomestic";

		// bin = Bank Identification Number = First 6 digits of card

		var payload = {
		  "key": merchant_id,
		  "command": cmd,
		  "var1": bin,
		  "hash": get_hash(cmd, bin)
		};

		https_post(payload, cb);
	};

	return this;
}

module.exports = PayU;