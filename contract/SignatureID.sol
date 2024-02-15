// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//   0x77E7b93Ab1fFdDAa0cb6F61BFc021eEbc3bCd3F5
contract SignatureID {
    
    struct UserData {
        string name;
        string dob;
        string gender;
        string nationality;
        string email;
        string phoneNumber;
        string nativeAddress;
        string residentialAddress;
        string socialProfile;
    }

    struct Document {
        string aadhar;
        string pan;
        string license;
    }

    mapping(address => UserData) private userDataMap;
    mapping(address => Document) private documentMap;

    modifier onlyUser() {
        require(bytes(userDataMap[msg.sender].name).length > 0, "User not registered");
        _;
    }

    function registerUser(string memory _name, string memory _dob, string memory _gender, string memory _nationality, string memory _email, string memory _phoneNumber, string memory _nativeAddress, string memory _residentialAddress, string memory _socialProfile) public {
        userDataMap[msg.sender] = UserData(_name, _dob, _gender, _nationality, _email, _phoneNumber, _nativeAddress, _residentialAddress, _socialProfile);
    }

    function getUserData() public view onlyUser returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        UserData memory userData = userDataMap[msg.sender];
        return (userData.name, userData.dob, userData.gender, userData.nationality, userData.email, userData.phoneNumber, userData.nativeAddress, userData.residentialAddress, userData.socialProfile);
    }

    function updateUserData(string memory _name, string memory _dob, string memory _gender, string memory _nationality, string memory _email, string memory _phoneNumber, string memory _nativeAddress, string memory _residentialAddress, string memory _socialProfile) public onlyUser {
        UserData storage existingData = userDataMap[msg.sender];

        if (bytes(_name).length > 0) {
            existingData.name = _name;
        }
        if (bytes(_dob).length > 0) {
            existingData.dob = _dob;
        }
        if (bytes(_gender).length > 0) {
            existingData.gender = _gender;
        }
        if (bytes(_nationality).length > 0) {
            existingData.nationality = _nationality;
        }
        if (bytes(_email).length > 0) {
            existingData.email = _email;
        }
        if (bytes(_phoneNumber).length > 0) {
            existingData.phoneNumber = _phoneNumber;
        }
        if (bytes(_nativeAddress).length > 0) {
            existingData.nativeAddress = _nativeAddress;
        }
        if (bytes(_residentialAddress).length > 0) {
            existingData.residentialAddress = _residentialAddress;
        }
        if (bytes(_socialProfile).length > 0) {
            existingData.socialProfile = _socialProfile;
        }
    }

    function getDocumentData() public view onlyUser returns (string memory, string memory, string memory) {
        Document memory documentData = documentMap[msg.sender];
        return (documentData.aadhar, documentData.pan, documentData.license);
    }

    function updateDocumentData(string memory _aadhar, string memory _pan, string memory _license) public onlyUser {
        Document storage existingData = documentMap[msg.sender];

        if (bytes(_aadhar).length > 0) {
            existingData.aadhar = _aadhar;
        }
        if (bytes(_pan).length > 0) {
            existingData.pan = _pan;
        }
        if (bytes(_license).length > 0) {
            existingData.license = _license;
        }
    }
}
