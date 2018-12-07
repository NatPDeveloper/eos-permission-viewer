![](https://github.com/NatPDeveloper/eos-permission-viewer/blob/master/public/EOSPV_logo.png?raw=true)

- - - -

### About the project: ### 

EOSPV is a simple permission viewer for the EOS blockchain. I made this in the hopes of spreading account security awareness. If the EOS User Agreement is implemented in its current capacity, [Article XII — Personal Security](https://medium.com/eos-new-york/eos-platform-user-agreement-v2-0-c0cc2496e650) will remove ECAF's ability to arbitrate on behalf of those who have had their keys stolen or phished.  My intention is to drive awareness of the importance of using the active key pair and reducing the use of the owner key pair.

### Project steps: ### 

1. basic html / routes - **DONE**
2. add API logic - **DONE**
3. render ui with API response - **DONE**
4. style

### How to Use When Completed: ### 

Simply enter your EOS account name (not public key) and the app will show you your current permission levels. It will also show you a warning if your owner/active keys are the same. An owner key should never be loaded into a wallet. Think of it as the master key, it is needed to change the ownership of the account. The active permission level is what you want to sign with. In the case that someone gets your active key, they will not be able to change it to something else. If you sign up for [Telegram alerts](https://t.me/EOSAlarmEBot) or [EOS Authority's](https://eosauthority.com/alerts) alert system, you will always be notified of an unstake command.
