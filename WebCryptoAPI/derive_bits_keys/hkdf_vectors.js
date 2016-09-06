
function getTestData() {

    // deriveBits and deriveKey take as input:
    // - derivedKey (actually, a CryptoKey representing a derivedKey)
    // - salt (BufferSource)
    // - hash (which one to use)
    // - iterations (how many times to use it)

    // deriveBits also takes a length. deriveKey uses the length of the output key
    // - length is the number of bits, NOT octets, but it MUST be a multiple of 8
    // - note that result of length(n) is first n bits of length(m) if m>n

    // Variations to test:
    // - empty, short, and fairly long derivedKey
    // - empty, short, and fairly long salt
    // - SHA-1, SHA-256, SHA-384, SHA-512 hash
    // - 1, 1000, and 100000 million iterations

    // Test cases to generate: 3 * 3 * 4 * 3 = 108

    // Error conditions to test:
    // - length null (OperationError)
    // - length not a multiple of 8 (OperationError)
    // - illegal name for hash algorithm (NotSupportedError)
    // - legal algorithm name but not digest one (e.g., AES-CBC) (NotSupportedError)
    // - baseKey usages missing "deriveBits" (InvalidAccessError)
    // - baseKey algorithm does not match HKDF (InvalidAccessError)
    // - 0 iterations

    var derivedKeyTypes = [
        {algorithm: {name: "AES-CBC", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CBC", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CBC", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-KW", length: 128}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "AES-KW", length: 192}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "AES-KW", length: 256}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "HMAC", hash: "SHA-1", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-256", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-384", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-512", length: 256}, usages: ["sign", "verify"]}
    ];

    var derivedKeys = {
        "short": new Uint8Array([80, 64, 115, 115, 119, 48, 114, 100]),
        "long": new Uint8Array([85, 115, 101, 114, 115, 32, 115, 104, 111, 117, 108, 100, 32, 112, 105, 99, 107, 32, 108, 111, 110, 103, 32, 112, 97, 115, 115, 112, 104, 114, 97, 115, 101, 115, 32, 40, 110, 111, 116, 32, 117, 115, 101, 32, 115, 104, 111, 114, 116, 32, 112, 97, 115, 115, 119, 111, 114, 100, 115, 41, 33]),
        "empty": new Uint8Array([])
    };

    var salts = {
        "normal": new Uint8Array([83, 111, 100, 105, 117, 109, 32, 67, 104, 108, 111, 114, 105, 100, 101, 32, 99, 111, 109, 112, 111, 117, 110, 100]),
        "empty": new Uint8Array([]),
        "missing": null
    };

    var infos = {
        "normal": new Uint8Array([72, 75, 68, 70, 32, 101, 120, 116, 114, 97, 32, 105, 110, 102, 111]),
        "empty": new Uint8Array([]),
        "missing": null
    };

    var derivations = {
        "short": {
            "normal": {
                "SHA-384": {
                    "normal": new Uint8Array([25, 186, 116, 54, 142, 107, 153, 51, 144, 242, 127, 233, 167, 208, 43, 195, 56, 23, 63, 114, 190, 113, 161, 159, 199, 68, 252, 219, 63, 212, 184, 75]),
                    "empty": new Uint8Array([151, 96, 31, 78, 12, 83, 165, 211, 243, 162, 129, 0, 153, 188, 104, 32, 236, 80, 8, 52, 52, 118, 155, 89, 252, 36, 164, 23, 169, 84, 55, 52]),
                    "missing": new Uint8Array([151, 96, 31, 78, 12, 83, 165, 211, 243, 162, 129, 0, 153, 188, 104, 32, 236, 80, 8, 52, 52, 118, 155, 89, 252, 36, 164, 23, 169, 84, 55, 52])
                },
                "SHA-512": {
                    "normal": new Uint8Array([75, 189, 109, 178, 67, 95, 182, 150, 21, 127, 96, 137, 201, 119, 195, 199, 63, 62, 172, 94, 243, 221, 107, 170, 230, 4, 203, 83, 191, 187, 21, 62]),
                    "empty": new Uint8Array([47, 49, 87, 231, 254, 12, 16, 176, 18, 152, 200, 240, 136, 106, 144, 237, 207, 128, 171, 222, 245, 219, 193, 223, 43, 20, 130, 83, 43, 82, 185, 52]),
                    "missing": new Uint8Array([47, 49, 87, 231, 254, 12, 16, 176, 18, 152, 200, 240, 136, 106, 144, 237, 207, 128, 171, 222, 245, 219, 193, 223, 43, 20, 130, 83, 43, 82, 185, 52])
                },
                "SHA-1": {
                    "normal": new Uint8Array([5, 173, 34, 237, 33, 56, 201, 96, 14, 77, 158, 39, 37, 222, 211, 1, 245, 210, 135, 251, 251, 87, 2, 249, 153, 188, 101, 54, 211, 237, 239, 152]),
                    "empty": new Uint8Array([213, 27, 111, 183, 229, 153, 202, 48, 197, 238, 38, 69, 147, 228, 184, 95, 34, 32, 199, 195, 171, 0, 49, 87, 191, 248, 203, 79, 54, 156, 117, 96]),
                    "missing": new Uint8Array([213, 27, 111, 183, 229, 153, 202, 48, 197, 238, 38, 69, 147, 228, 184, 95, 34, 32, 199, 195, 171, 0, 49, 87, 191, 248, 203, 79, 54, 156, 117, 96])
                },
                "SHA-256": {
                    "normal": new Uint8Array([42, 245, 144, 30, 40, 132, 156, 40, 68, 56, 87, 56, 106, 161, 172, 59, 177, 39, 233, 38, 49, 193, 192, 81, 72, 45, 102, 144, 148, 23, 114, 180]),
                    "empty": new Uint8Array([158, 75, 113, 144, 51, 116, 33, 1, 233, 15, 26, 214, 30, 47, 243, 180, 37, 104, 99, 102, 114, 150, 215, 67, 137, 241, 240, 42, 242, 196, 230, 166]),
                    "missing": new Uint8Array([158, 75, 113, 144, 51, 116, 33, 1, 233, 15, 26, 214, 30, 47, 243, 180, 37, 104, 99, 102, 114, 150, 215, 67, 137, 241, 240, 42, 242, 196, 230, 166])
                }
            },
            "empty": {
                "SHA-384": {
                    "normal": new Uint8Array([251, 72, 47, 242, 44, 79, 141, 70, 108, 77, 254, 110, 41, 242, 204, 46, 205, 171, 245, 136, 67, 40, 251, 240, 138, 115, 143, 217, 69, 241, 102, 203]),
                    "empty": new Uint8Array([30, 2, 60, 23, 179, 64, 83, 60, 234, 239, 57, 35, 12, 184, 179, 187, 219, 246, 99, 161, 61, 96, 117, 208, 221, 50, 108, 4, 148, 120, 251, 165]),
                    "missing": new Uint8Array([30, 2, 60, 23, 179, 64, 83, 60, 234, 239, 57, 35, 12, 184, 179, 187, 219, 246, 99, 161, 61, 96, 117, 208, 221, 50, 108, 4, 148, 120, 251, 165])
                },
                "SHA-512": {
                    "normal": new Uint8Array([241, 123, 91, 220, 216, 215, 211, 212, 96, 16, 54, 161, 148, 54, 49, 125, 22, 68, 249, 164, 224, 149, 110, 252, 14, 55, 43, 131, 172, 218, 207, 219]),
                    "empty": new Uint8Array([199, 180, 116, 148, 47, 49, 248, 63, 175, 93, 20, 115, 24, 2, 177, 189, 73, 71, 133, 73, 203, 58, 143, 61, 191, 237, 196, 211, 32, 156, 245, 182]),
                    "missing": new Uint8Array([199, 180, 116, 148, 47, 49, 248, 63, 175, 93, 20, 115, 24, 2, 177, 189, 73, 71, 133, 73, 203, 58, 143, 61, 191, 237, 196, 211, 32, 156, 245, 182])
                },
                "SHA-1": {
                    "normal": new Uint8Array([193, 38, 241, 230, 242, 90, 157, 228, 44, 247, 212, 39, 5, 154, 82, 237, 150, 1, 242, 154, 88, 21, 203, 251, 198, 75, 199, 246, 104, 198, 163, 65]),
                    "empty": new Uint8Array([50, 21, 195, 240, 141, 231, 5, 73, 176, 81, 183, 3, 55, 69, 168, 24, 79, 140, 186, 166, 177, 115, 83, 48, 210, 188, 182, 177, 111, 70, 66, 239]),
                    "missing": new Uint8Array([50, 21, 195, 240, 141, 231, 5, 73, 176, 81, 183, 3, 55, 69, 168, 24, 79, 140, 186, 166, 177, 115, 83, 48, 210, 188, 182, 177, 111, 70, 66, 239])
                },
                "SHA-256": {
                    "normal": new Uint8Array([115, 60, 139, 107, 207, 172, 135, 92, 127, 8, 152, 42, 110, 63, 251, 86, 10, 206, 166, 241, 101, 71, 110, 184, 52, 96, 185, 53, 62, 212, 29, 254]),
                    "empty": new Uint8Array([200, 225, 39, 116, 19, 83, 5, 201, 20, 127, 44, 196, 118, 110, 94, 173, 37, 216, 244, 87, 185, 161, 149, 61, 82, 103, 115, 97, 206, 213, 88, 251]),
                    "missing": new Uint8Array([200, 225, 39, 116, 19, 83, 5, 201, 20, 127, 44, 196, 118, 110, 94, 173, 37, 216, 244, 87, 185, 161, 149, 61, 82, 103, 115, 97, 206, 213, 88, 251])
                }
            },
            "missing": {
                "SHA-384": {
                    "normal": new Uint8Array([251, 72, 47, 242, 44, 79, 141, 70, 108, 77, 254, 110, 41, 242, 204, 46, 205, 171, 245, 136, 67, 40, 251, 240, 138, 115, 143, 217, 69, 241, 102, 203]),
                    "empty": new Uint8Array([30, 2, 60, 23, 179, 64, 83, 60, 234, 239, 57, 35, 12, 184, 179, 187, 219, 246, 99, 161, 61, 96, 117, 208, 221, 50, 108, 4, 148, 120, 251, 165]),
                    "missing": new Uint8Array([30, 2, 60, 23, 179, 64, 83, 60, 234, 239, 57, 35, 12, 184, 179, 187, 219, 246, 99, 161, 61, 96, 117, 208, 221, 50, 108, 4, 148, 120, 251, 165])
                },
                "SHA-512": {
                    "normal": new Uint8Array([241, 123, 91, 220, 216, 215, 211, 212, 96, 16, 54, 161, 148, 54, 49, 125, 22, 68, 249, 164, 224, 149, 110, 252, 14, 55, 43, 131, 172, 218, 207, 219]),
                    "empty": new Uint8Array([199, 180, 116, 148, 47, 49, 248, 63, 175, 93, 20, 115, 24, 2, 177, 189, 73, 71, 133, 73, 203, 58, 143, 61, 191, 237, 196, 211, 32, 156, 245, 182]),
                    "missing": new Uint8Array([199, 180, 116, 148, 47, 49, 248, 63, 175, 93, 20, 115, 24, 2, 177, 189, 73, 71, 133, 73, 203, 58, 143, 61, 191, 237, 196, 211, 32, 156, 245, 182])
                },
                "SHA-1": {
                    "normal": new Uint8Array([193, 38, 241, 230, 242, 90, 157, 228, 44, 247, 212, 39, 5, 154, 82, 237, 150, 1, 242, 154, 88, 21, 203, 251, 198, 75, 199, 246, 104, 198, 163, 65]),
                    "empty": new Uint8Array([50, 21, 195, 240, 141, 231, 5, 73, 176, 81, 183, 3, 55, 69, 168, 24, 79, 140, 186, 166, 177, 115, 83, 48, 210, 188, 182, 177, 111, 70, 66, 239]),
                    "missing": new Uint8Array([50, 21, 195, 240, 141, 231, 5, 73, 176, 81, 183, 3, 55, 69, 168, 24, 79, 140, 186, 166, 177, 115, 83, 48, 210, 188, 182, 177, 111, 70, 66, 239])
                },
                "SHA-256": {
                    "normal": new Uint8Array([115, 60, 139, 107, 207, 172, 135, 92, 127, 8, 152, 42, 110, 63, 251, 86, 10, 206, 166, 241, 101, 71, 110, 184, 52, 96, 185, 53, 62, 212, 29, 254]),
                    "empty": new Uint8Array([200, 225, 39, 116, 19, 83, 5, 201, 20, 127, 44, 196, 118, 110, 94, 173, 37, 216, 244, 87, 185, 161, 149, 61, 82, 103, 115, 97, 206, 213, 88, 251]),
                    "missing": new Uint8Array([200, 225, 39, 116, 19, 83, 5, 201, 20, 127, 44, 196, 118, 110, 94, 173, 37, 216, 244, 87, 185, 161, 149, 61, 82, 103, 115, 97, 206, 213, 88, 251])
                }
            }
        },
        "long": {
            "normal": {
                "SHA-384": {
                    "normal": new Uint8Array([249, 21, 113, 181, 33, 247, 238, 241, 62, 87, 58, 164, 99, 120, 101, 158, 243, 183, 243, 111, 253, 209, 187, 5, 93, 178, 205, 119, 210, 96, 196, 103]),
                    "empty": new Uint8Array([104, 175, 28, 44, 246, 185, 55, 13, 32, 84, 52, 71, 152, 189, 187, 24, 71, 204, 244, 7, 183, 101, 43, 121, 61, 209, 54, 212, 100, 14, 3, 72]),
                    "missing": new Uint8Array([104, 175, 28, 44, 246, 185, 55, 13, 32, 84, 52, 71, 152, 189, 187, 24, 71, 204, 244, 7, 183, 101, 43, 121, 61, 209, 54, 212, 100, 14, 3, 72])
                },
                "SHA-512": {
                    "normal": new Uint8Array([113, 10, 174, 47, 223, 136, 158, 69, 254, 15, 185, 149, 178, 194, 107, 51, 235, 152, 134, 80, 236, 15, 174, 241, 103, 2, 138, 122, 108, 203, 54, 56]),
                    "empty": new Uint8Array([229, 222, 86, 128, 129, 199, 30, 86, 39, 80, 130, 152, 113, 195, 66, 117, 129, 4, 118, 94, 214, 243, 6, 240, 97, 60, 157, 75, 179, 54, 242, 170]),
                    "missing": new Uint8Array([229, 222, 86, 128, 129, 199, 30, 86, 39, 80, 130, 152, 113, 195, 66, 117, 129, 4, 118, 94, 214, 243, 6, 240, 97, 60, 157, 75, 179, 54, 242, 170])
                },
                "SHA-1": {
                    "normal": new Uint8Array([127, 149, 126, 220, 188, 227, 203, 11, 112, 86, 110, 30, 182, 14, 253, 30, 64, 90, 19, 48, 76, 102, 29, 54, 99, 119, 129, 9, 191, 6, 137, 156]),
                    "empty": new Uint8Array([48, 98, 243, 207, 26, 115, 11, 156, 239, 81, 240, 44, 29, 250, 200, 94, 217, 30, 75, 0, 101, 235, 80, 202, 159, 216, 176, 16, 126, 114, 135, 51]),
                    "missing": new Uint8Array([48, 98, 243, 207, 26, 115, 11, 156, 239, 81, 240, 44, 29, 250, 200, 94, 217, 30, 75, 0, 101, 235, 80, 202, 159, 216, 176, 16, 126, 114, 135, 51])
                },
                "SHA-256": {
                    "normal": new Uint8Array([49, 183, 214, 133, 48, 168, 99, 231, 23, 192, 129, 202, 105, 23, 182, 134, 80, 179, 221, 154, 41, 243, 6, 6, 226, 202, 209, 153, 190, 193, 77, 19]),
                    "empty": new Uint8Array([229, 121, 209, 249, 231, 240, 142, 111, 153, 15, 252, 252, 206, 30, 210, 1, 197, 227, 126, 98, 205, 246, 6, 240, 186, 74, 202, 128, 66, 127, 188, 68]),
                    "missing": new Uint8Array([229, 121, 209, 249, 231, 240, 142, 111, 153, 15, 252, 252, 206, 30, 210, 1, 197, 227, 126, 98, 205, 246, 6, 240, 186, 74, 202, 128, 66, 127, 188, 68])
                }
            },
            "empty": {
                "SHA-384": {
                    "normal": new Uint8Array([97, 158, 182, 249, 40, 115, 149, 187, 213, 237, 106, 103, 201, 104, 70, 90, 216, 43, 108, 85, 159, 60, 56, 182, 4, 187, 176, 143, 88, 50, 11, 3]),
                    "empty": new Uint8Array([255, 68, 123, 66, 61, 131, 254, 118, 131, 108, 50, 51, 114, 40, 181, 107, 91, 217, 191, 104, 213, 142, 125, 202, 75, 124, 202, 132, 42, 69, 225, 26]),
                    "missing": new Uint8Array([255, 68, 123, 66, 61, 131, 254, 118, 131, 108, 50, 51, 114, 40, 181, 107, 91, 217, 191, 104, 213, 142, 125, 202, 75, 124, 202, 132, 42, 69, 225, 26])
                },
                "SHA-512": {
                    "normal": new Uint8Array([19, 62, 138, 127, 127, 244, 51, 105, 12, 200, 132, 50, 194, 163, 56, 194, 119, 229, 193, 55, 86, 255, 135, 143, 70, 117, 63, 230, 165, 100, 227, 229]),
                    "empty": new Uint8Array([222, 84, 247, 238, 200, 12, 156, 198, 109, 52, 159, 201, 135, 248, 13, 70, 29, 178, 239, 79, 244, 225, 133, 5, 210, 139, 216, 12, 180, 44, 125, 118]),
                    "missing": new Uint8Array([222, 84, 247, 238, 200, 12, 156, 198, 109, 52, 159, 201, 135, 248, 13, 70, 29, 178, 239, 79, 244, 225, 133, 5, 210, 139, 216, 12, 180, 44, 125, 118])
                },
                "SHA-1": {
                    "normal": new Uint8Array([173, 185, 60, 219, 206, 121, 183, 213, 17, 89, 182, 192, 19, 26, 43, 98, 242, 56, 40, 210, 106, 205, 104, 94, 52, 192, 101, 53, 230, 247, 116, 150]),
                    "empty": new Uint8Array([71, 113, 13, 42, 117, 7, 224, 90, 29, 220, 200, 122, 124, 47, 144, 97, 119, 162, 102, 239, 185, 230, 34, 81, 12, 204, 179, 113, 60, 208, 141, 88]),
                    "missing": new Uint8Array([71, 113, 13, 42, 117, 7, 224, 90, 29, 220, 200, 122, 124, 47, 144, 97, 119, 162, 102, 239, 185, 230, 34, 81, 12, 204, 179, 113, 60, 208, 141, 88])
                },
                "SHA-256": {
                    "normal": new Uint8Array([164, 1, 215, 201, 21, 138, 41, 229, 199, 25, 58, 185, 115, 15, 7, 72, 133, 28, 197, 186, 173, 180, 44, 173, 2, 75, 98, 144, 254, 33, 52, 54]),
                    "empty": new Uint8Array([180, 247, 231, 85, 118, 116, 213, 1, 203, 251, 192, 20, 138, 216, 0, 192, 117, 1, 137, 254, 41, 90, 42, 202, 94, 27, 244, 18, 44, 133, 237, 249]),
                    "missing": new Uint8Array([180, 247, 231, 85, 118, 116, 213, 1, 203, 251, 192, 20, 138, 216, 0, 192, 117, 1, 137, 254, 41, 90, 42, 202, 94, 27, 244, 18, 44, 133, 237, 249])
                }
            },
            "missing": {
                "SHA-384": {
                    "normal": new Uint8Array([97, 158, 182, 249, 40, 115, 149, 187, 213, 237, 106, 103, 201, 104, 70, 90, 216, 43, 108, 85, 159, 60, 56, 182, 4, 187, 176, 143, 88, 50, 11, 3]),
                    "empty": new Uint8Array([255, 68, 123, 66, 61, 131, 254, 118, 131, 108, 50, 51, 114, 40, 181, 107, 91, 217, 191, 104, 213, 142, 125, 202, 75, 124, 202, 132, 42, 69, 225, 26]),
                    "missing": new Uint8Array([255, 68, 123, 66, 61, 131, 254, 118, 131, 108, 50, 51, 114, 40, 181, 107, 91, 217, 191, 104, 213, 142, 125, 202, 75, 124, 202, 132, 42, 69, 225, 26])
                },
                "SHA-512": {
                    "normal": new Uint8Array([19, 62, 138, 127, 127, 244, 51, 105, 12, 200, 132, 50, 194, 163, 56, 194, 119, 229, 193, 55, 86, 255, 135, 143, 70, 117, 63, 230, 165, 100, 227, 229]),
                    "empty": new Uint8Array([222, 84, 247, 238, 200, 12, 156, 198, 109, 52, 159, 201, 135, 248, 13, 70, 29, 178, 239, 79, 244, 225, 133, 5, 210, 139, 216, 12, 180, 44, 125, 118]),
                    "missing": new Uint8Array([222, 84, 247, 238, 200, 12, 156, 198, 109, 52, 159, 201, 135, 248, 13, 70, 29, 178, 239, 79, 244, 225, 133, 5, 210, 139, 216, 12, 180, 44, 125, 118])
                },
                "SHA-1": {
                    "normal": new Uint8Array([173, 185, 60, 219, 206, 121, 183, 213, 17, 89, 182, 192, 19, 26, 43, 98, 242, 56, 40, 210, 106, 205, 104, 94, 52, 192, 101, 53, 230, 247, 116, 150]),
                    "empty": new Uint8Array([71, 113, 13, 42, 117, 7, 224, 90, 29, 220, 200, 122, 124, 47, 144, 97, 119, 162, 102, 239, 185, 230, 34, 81, 12, 204, 179, 113, 60, 208, 141, 88]),
                    "missing": new Uint8Array([71, 113, 13, 42, 117, 7, 224, 90, 29, 220, 200, 122, 124, 47, 144, 97, 119, 162, 102, 239, 185, 230, 34, 81, 12, 204, 179, 113, 60, 208, 141, 88])
                },
                "SHA-256": {
                    "normal": new Uint8Array([164, 1, 215, 201, 21, 138, 41, 229, 199, 25, 58, 185, 115, 15, 7, 72, 133, 28, 197, 186, 173, 180, 44, 173, 2, 75, 98, 144, 254, 33, 52, 54]),
                    "empty": new Uint8Array([180, 247, 231, 85, 118, 116, 213, 1, 203, 251, 192, 20, 138, 216, 0, 192, 117, 1, 137, 254, 41, 90, 42, 202, 94, 27, 244, 18, 44, 133, 237, 249]),
                    "missing": new Uint8Array([180, 247, 231, 85, 118, 116, 213, 1, 203, 251, 192, 20, 138, 216, 0, 192, 117, 1, 137, 254, 41, 90, 42, 202, 94, 27, 244, 18, 44, 133, 237, 249])
                }
            }
        },
        "empty": {
            "normal": {
                "SHA-384": {
                    "normal": new Uint8Array([106, 134, 50, 228, 134, 137, 157, 194, 100, 241, 161, 249, 32, 89, 63, 40, 128, 128, 78, 14, 26, 218, 207, 148, 235, 78, 213, 229, 248, 61, 13, 18]),
                    "empty": new Uint8Array([234, 80, 18, 254, 181, 135, 81, 213, 188, 142, 182, 78, 13, 234, 205, 89, 126, 215, 16, 201, 243, 82, 88, 174, 107, 154, 8, 122, 237, 7, 37, 174]),
                    "missing": new Uint8Array([234, 80, 18, 254, 181, 135, 81, 213, 188, 142, 182, 78, 13, 234, 205, 89, 126, 215, 16, 201, 243, 82, 88, 174, 107, 154, 8, 122, 237, 7, 37, 174])
                },
                "SHA-512": {
                    "normal": new Uint8Array([199, 151, 225, 209, 242, 202, 183, 242, 138, 95, 67, 69, 92, 16, 89, 127, 148, 51, 133, 237, 251, 66, 140, 254, 43, 152, 190, 212, 169, 85, 215, 161]),
                    "empty": new Uint8Array([224, 140, 220, 196, 197, 166, 170, 121, 157, 134, 188, 3, 169, 84, 117, 39, 110, 187, 128, 29, 154, 222, 1, 110, 20, 168, 250, 91, 100, 5, 22, 81]),
                    "missing": new Uint8Array([224, 140, 220, 196, 197, 166, 170, 121, 157, 134, 188, 3, 169, 84, 117, 39, 110, 187, 128, 29, 154, 222, 1, 110, 20, 168, 250, 91, 100, 5, 22, 81])
                },
                "SHA-1": {
                    "normal": new Uint8Array([171, 103, 158, 103, 188, 180, 48, 95, 238, 66, 239, 148, 14, 80, 156, 221, 212, 6, 227, 73, 143, 133, 116, 24, 169, 121, 171, 57, 207, 49, 95, 81]),
                    "empty": new Uint8Array([254, 66, 33, 135, 24, 140, 134, 54, 211, 109, 170, 213, 142, 242, 132, 49, 164, 51, 191, 15, 239, 114, 209, 202, 231, 53, 160, 75, 219, 190, 185, 211]),
                    "missing": new Uint8Array([254, 66, 33, 135, 24, 140, 134, 54, 211, 109, 170, 213, 142, 242, 132, 49, 164, 51, 191, 15, 239, 114, 209, 202, 231, 53, 160, 75, 219, 190, 185, 211])
                },
                "SHA-256": {
                    "normal": new Uint8Array([223, 146, 185, 169, 250, 156, 1, 184, 152, 206, 234, 161, 49, 52, 131, 46, 49, 203, 28, 8, 29, 22, 165, 35, 92, 105, 216, 86, 81, 227, 23, 172]),
                    "empty": new Uint8Array([230, 13, 67, 43, 6, 238, 136, 157, 250, 183, 41, 154, 32, 236, 35, 105, 117, 49, 209, 25, 252, 247, 102, 208, 152, 141, 10, 203, 12, 0, 199, 247]),
                    "missing": new Uint8Array([230, 13, 67, 43, 6, 238, 136, 157, 250, 183, 41, 154, 32, 236, 35, 105, 117, 49, 209, 25, 252, 247, 102, 208, 152, 141, 10, 203, 12, 0, 199, 247])
                }
            },
            "empty": {
                "SHA-384": {
                    "normal": new Uint8Array([234, 203, 157, 102, 112, 255, 59, 25, 4, 119, 154, 65, 145, 1, 177, 255, 170, 189, 109, 101, 16, 189, 80, 133, 104, 1, 116, 106, 135, 31, 123, 49]),
                    "empty": new Uint8Array([71, 12, 198, 83, 135, 202, 74, 16, 199, 166, 138, 59, 81, 72, 200, 229, 19, 218, 166, 49, 1, 0, 7, 57, 196, 198, 101, 155, 134, 17, 136, 132]),
                    "missing": new Uint8Array([71, 12, 198, 83, 135, 202, 74, 16, 199, 166, 138, 59, 81, 72, 200, 229, 19, 218, 166, 49, 1, 0, 7, 57, 196, 198, 101, 155, 134, 17, 136, 132])
                },
                "SHA-512": {
                    "normal": new Uint8Array([87, 3, 145, 116, 241, 111, 84, 24, 168, 104, 86, 218, 235, 119, 246, 157, 75, 77, 80, 0, 51, 75, 109, 209, 244, 244, 179, 231, 179, 220, 185, 211]),
                    "empty": new Uint8Array([157, 115, 201, 142, 121, 30, 128, 235, 229, 180, 203, 69, 105, 58, 163, 47, 221, 68, 181, 250, 62, 218, 179, 236, 130, 249, 208, 244, 214, 105, 5, 226]),
                    "missing": new Uint8Array([157, 115, 201, 142, 121, 30, 128, 235, 229, 180, 203, 69, 105, 58, 163, 47, 221, 68, 181, 250, 62, 218, 179, 236, 130, 249, 208, 244, 214, 105, 5, 226])
                },
                "SHA-1": {
                    "normal": new Uint8Array([161, 189, 216, 195, 50, 198, 70, 74, 75, 182, 162, 242, 49, 174, 201, 164, 68, 35, 126, 171, 224, 77, 47, 85, 242, 171, 37, 212, 12, 84, 235, 238]),
                    "empty": new Uint8Array([136, 95, 192, 41, 179, 34, 75, 137, 110, 9, 224, 187, 229, 235, 52, 126, 197, 158, 104, 39, 200, 232, 87, 179, 148, 245, 79, 244, 155, 136, 168, 246]),
                    "missing": new Uint8Array([136, 95, 192, 41, 179, 34, 75, 137, 110, 9, 224, 187, 229, 235, 52, 126, 197, 158, 104, 39, 200, 232, 87, 179, 148, 245, 79, 244, 155, 136, 168, 246])
                },
                "SHA-256": {
                    "normal": new Uint8Array([183, 184, 110, 66, 42, 209, 200, 165, 113, 253, 165, 40, 218, 22, 160, 102, 244, 36, 134, 221, 64, 86, 121, 47, 217, 51, 98, 8, 142, 93, 212, 194]),
                    "empty": new Uint8Array([235, 112, 240, 29, 237, 233, 175, 175, 164, 73, 238, 225, 177, 40, 101, 4, 225, 246, 35, 136, 179, 247, 221, 79, 149, 102, 151, 176, 232, 40, 254, 24]),
                    "missing": new Uint8Array([235, 112, 240, 29, 237, 233, 175, 175, 164, 73, 238, 225, 177, 40, 101, 4, 225, 246, 35, 136, 179, 247, 221, 79, 149, 102, 151, 176, 232, 40, 254, 24])
                }
            },
            "missing": {
                "SHA-384": {
                    "normal": new Uint8Array([234, 203, 157, 102, 112, 255, 59, 25, 4, 119, 154, 65, 145, 1, 177, 255, 170, 189, 109, 101, 16, 189, 80, 133, 104, 1, 116, 106, 135, 31, 123, 49]),
                    "empty": new Uint8Array([71, 12, 198, 83, 135, 202, 74, 16, 199, 166, 138, 59, 81, 72, 200, 229, 19, 218, 166, 49, 1, 0, 7, 57, 196, 198, 101, 155, 134, 17, 136, 132]),
                    "missing": new Uint8Array([71, 12, 198, 83, 135, 202, 74, 16, 199, 166, 138, 59, 81, 72, 200, 229, 19, 218, 166, 49, 1, 0, 7, 57, 196, 198, 101, 155, 134, 17, 136, 132])
                },
                "SHA-512": {
                    "normal": new Uint8Array([87, 3, 145, 116, 241, 111, 84, 24, 168, 104, 86, 218, 235, 119, 246, 157, 75, 77, 80, 0, 51, 75, 109, 209, 244, 244, 179, 231, 179, 220, 185, 211]),
                    "empty": new Uint8Array([157, 115, 201, 142, 121, 30, 128, 235, 229, 180, 203, 69, 105, 58, 163, 47, 221, 68, 181, 250, 62, 218, 179, 236, 130, 249, 208, 244, 214, 105, 5, 226]),
                    "missing": new Uint8Array([157, 115, 201, 142, 121, 30, 128, 235, 229, 180, 203, 69, 105, 58, 163, 47, 221, 68, 181, 250, 62, 218, 179, 236, 130, 249, 208, 244, 214, 105, 5, 226])
                },
                "SHA-1": {
                    "normal": new Uint8Array([161, 189, 216, 195, 50, 198, 70, 74, 75, 182, 162, 242, 49, 174, 201, 164, 68, 35, 126, 171, 224, 77, 47, 85, 242, 171, 37, 212, 12, 84, 235, 238]),
                    "empty": new Uint8Array([136, 95, 192, 41, 179, 34, 75, 137, 110, 9, 224, 187, 229, 235, 52, 126, 197, 158, 104, 39, 200, 232, 87, 179, 148, 245, 79, 244, 155, 136, 168, 246]),
                    "missing": new Uint8Array([136, 95, 192, 41, 179, 34, 75, 137, 110, 9, 224, 187, 229, 235, 52, 126, 197, 158, 104, 39, 200, 232, 87, 179, 148, 245, 79, 244, 155, 136, 168, 246])
                },
                "SHA-256": {
                    "normal": new Uint8Array([183, 184, 110, 66, 42, 209, 200, 165, 113, 253, 165, 40, 218, 22, 160, 102, 244, 36, 134, 221, 64, 86, 121, 47, 217, 51, 98, 8, 142, 93, 212, 194]),
                    "empty": new Uint8Array([235, 112, 240, 29, 237, 233, 175, 175, 164, 73, 238, 225, 177, 40, 101, 4, 225, 246, 35, 136, 179, 247, 221, 79, 149, 102, 151, 176, 232, 40, 254, 24]),
                    "missing": new Uint8Array([235, 112, 240, 29, 237, 233, 175, 175, 164, 73, 238, 225, 177, 40, 101, 4, 225, 246, 35, 136, 179, 247, 221, 79, 149, 102, 151, 176, 232, 40, 254, 24])
                }
            }
        }
    };

    return {derivedKeys: derivedKeys, salts: salts, derivations: derivations, derivedKeyTypes: derivedKeyTypes, infos: infos};
}
