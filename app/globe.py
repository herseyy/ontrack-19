from globe.connect import oauth

oauth = oauth.Oauth("MBn4CG7RKpu4RTk4oMiRaxuGzB5pC7pe", "0ff2d5117c17472f54f61dcdf51c05f8a549b28d5b25646c75a53056aac2bdd1")

# # get redirect url
print (oauth.getRedirectUrl())

# # get access token
print (oauth.getAccessToken("21669460 (Cross-telco: 225649460)"))


# from globe.connect import sms

# sms = sms.Sms("[shortcode]","[token]")
# sms.setReceiverAddress("[receiver_address]")
# sms.setMessage("[message]")
# sms.setClientCorrelator("[correlator]")
# sms.sendMessage()

# print sms.getResponse()




