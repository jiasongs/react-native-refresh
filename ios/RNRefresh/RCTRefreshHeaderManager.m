//
//  RCTRefreshHeaderManager.m
//  RNRefresh
//
//  Created by jiasong on 2019/9/2.
//  Copyright © 2020 jiasong. All rights reserved.
//

#import "RCTRefreshHeaderManager.h"
#import "RCTRefreshHeader.h"

@implementation RCTRefreshHeaderManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [[RCTRefreshHeader alloc] init];
}

@end
