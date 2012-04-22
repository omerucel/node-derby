/**
 * @see http://stackoverflow.com/a/383245
 */
exports.extendObject = function extendObject(obj1, obj2) {
    for (var p in obj2) {
        try {
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch(e) {
            obj1[p] = obj2[p];
        }
    }

    return obj1;
};