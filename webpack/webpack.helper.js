
const merge = function(common, env) {
    let finalEnv = {};
    Object.keys(common).forEach(function(commonKey) {
        finalEnv[commonKey] = common[commonKey];
    });
    Object.keys(env).forEach(function(envKey) {
        finalEnv[envKey] = env[envKey];
    });
    return finalEnv;
}

exports.merge = merge;