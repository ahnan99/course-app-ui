export default function checkUSCI(code) {	//统一社会信用代码校验函数  return true/false
		if (!/^[0-9A-Z]{18}$/.test(code)) {
			return false; // 格式不正确
		}
	 
		const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
		const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
		let sum = 0;
		let index = 0;
	 
		for (let i = 0; i < 17; i++) {
			const charIndex = chars.indexOf(code[i].toUpperCase());
			sum += charIndex * weights[index++];
			index %= 20; // 因为是模20运算，所以取余数
		}
	 
		const checkDigit = chars[(31 - (sum % 31)) % 31]; // 根据计算结果找到对应的校验码字符
		return checkDigit === code[17].toUpperCase(); // 比较计算出的校验码与最后一位是否一致
	}
