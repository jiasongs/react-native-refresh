/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTRefreshHeaderManager.h"
#import "RCTRefreshHeader.h"

@implementation RCTRefreshHeaderManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[RCTRefreshHeader alloc] init];
}


@end
