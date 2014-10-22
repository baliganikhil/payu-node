payu-node
----

payu-node is a simple wrapper to use PayU APIs from within Node JS.

### Installation
```
npm install payu
```

### Usage
```javascript
var PayU = require('payu');
var payu = new PayU(merchant_id, salt, payu_url);
```
...where `merchant_id` and `salt` are unique to you.
`payu_url` is the url to which you want to make your calls to - production or test. If not provided, it defaults to test url with json output. The hash is created internally.

### API call format
Every API is of the following format:
```javascript
payu.api_name(param1[, param2...], callback);
```
where callback is a function with two arguments - error and response. Error has error in the http call and not PayU API errors. The response is provided as is.

####Example:
```javascript
var txn_id = '12345';
payu.verify_payment(txn_id, function(err, response) {
    console.error(err);
    console.log(response);
});
```

### Supported APIs
```javascript
verify_payment(txn_id, cb);
check_payment(mihpayid, cb);
cancel_refund_transaction(mihpayid, token_id, refund_amt, cb);
check_action_status(request_id, cb);
capture_transaction(mihpayid, token_id, cb);
update_requests(mihpayid, request_id, bank_ref_id, amt, action, status, cb);
cod_verify(mihpayid, token_id, amt, cb);
cod_cancel(mihpayid, token_id, amt, cb);
cod_settled(mihpayid, token_id, amt, cb);
get_TDR(mihpayid, cb);
udf_update(txn_id, udf1, udf2, udf3, udf4, udf5, cb);
getNetbankingStatus(ibibo_code, cb);
getIssuingBankStatus(bin, cb);
get_Transaction_Details(start_date, end_date, cb);
get_transaction_info(start_time, end_time, cb);
check_isDomestic(bin, cb);
```

### Bugs and Issues
Please report and bugs and issues that you face. If you can fix any, please go ahead and fix and send me a pull request. Other API support will come after some time.

#### License
MIT
